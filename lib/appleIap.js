// lib/appleIap.js
//
// Apple In-App Purchase helpers for the iOS app. Each paid course is one
// Non-Consumable product in App Store Connect whose Product ID is built from
// the course id, so no course field has to store it:
//
//   in.sscoaching.app.c_<courseId>
//
// The app sends StoreKit 2's signed transaction (a JWS). We verify it offline:
// the certificate chain in its header must end at Apple Root CA - G3 (pinned
// by fingerprint), carry Apple's App Store receipt-signing OIDs, and sign the
// payload. No App Store Server API key is needed for this.

import crypto from "crypto";

export const BUNDLE_ID = "in.sscoaching.app";
export const PRODUCT_PREFIX = "in.sscoaching.app.c_";

// SHA-256 of https://www.apple.com/certificateauthority/AppleRootCA-G3.cer
const APPLE_ROOT_G3_SHA256 =
  "63:34:3A:BF:B8:9A:6A:03:EB:B5:7E:9B:3F:5F:A7:BE:7C:4F:5C:75:6F:30:17:B3:A8:C4:88:C3:65:3E:91:79";
const OID_INTERMEDIATE = "1.2.840.113635.100.6.2.1";
const OID_LEAF = "1.2.840.113635.100.6.11.1";

export const productIdForCourse = (courseId) => PRODUCT_PREFIX + String(courseId);

export function courseIdFromProduct(productId) {
  const s = String(productId || "");
  if (!s.startsWith(PRODUCT_PREFIX)) return null;
  const id = s.slice(PRODUCT_PREFIX.length);
  return /^[0-9a-f]{24}$/i.test(id) ? id : null;
}

/** Same UUID the app passes as appAccountToken, so a transaction is tied to one student. */
export function accountTokenForStudent(studentId) {
  const h = String(studentId).toLowerCase();
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(12, 15)}-8${h.slice(15, 18)}-${h.slice(18, 24)}000000`;
}

const b64url = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

// OIDs live in the DER of the certificate's extensions; Node does not expose
// arbitrary extensions, so look for the encoded OID bytes.
function hasOid(cert, oid) {
  const parts = oid.split(".").map(Number);
  const bytes = [40 * parts[0] + parts[1]];
  for (const n of parts.slice(2)) {
    const enc = [n & 0x7f];
    for (let v = n >> 7; v > 0; v >>= 7) enc.unshift((v & 0x7f) | 0x80);
    bytes.push(...enc);
  }
  const needle = Buffer.from([0x06, bytes.length, ...bytes]);
  return cert.raw.includes(needle);
}

/**
 * Verify a StoreKit 2 signed transaction and return its decoded payload.
 * Throws if the signature, chain or dates do not check out.
 */
export function verifySignedTransaction(jws) {
  const parts = String(jws || "").split(".");
  if (parts.length !== 3) throw new Error("Malformed transaction");
  const header = JSON.parse(b64url(parts[0]).toString("utf8"));
  if (header.alg !== "ES256" || !Array.isArray(header.x5c) || header.x5c.length !== 3)
    throw new Error("Unexpected transaction header");

  const [leaf, intermediate, root] = header.x5c.map(
    (c) => new crypto.X509Certificate(Buffer.from(c, "base64"))
  );
  if (root.fingerprint256 !== APPLE_ROOT_G3_SHA256) throw new Error("Not signed by Apple");
  if (!intermediate.verify(root.publicKey) || !leaf.verify(intermediate.publicKey))
    throw new Error("Broken certificate chain");
  if (!hasOid(intermediate, OID_INTERMEDIATE) || !hasOid(leaf, OID_LEAF))
    throw new Error("Not an App Store signing certificate");

  const payload = JSON.parse(b64url(parts[1]).toString("utf8"));
  // Apple checks the chain at the time the transaction was signed
  const at = new Date(payload.signedDate || Date.now());
  for (const c of [leaf, intermediate, root]) {
    if (at < new Date(c.validFrom) || at > new Date(c.validTo)) throw new Error("Certificate expired");
  }

  const ok = crypto.verify(
    "sha256",
    Buffer.from(`${parts[0]}.${parts[1]}`),
    { key: leaf.publicKey, dsaEncoding: "ieee-p1363" },
    b64url(parts[2])
  );
  if (!ok) throw new Error("Bad signature");
  return payload;
}
