import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { videoUrl } = req.body;
  if (!videoUrl) return res.status(400).json({ error: "videoUrl required" });

  const tokenKey = process.env.BUNNY_TOKEN_KEY;
  const cdnHost  = process.env.BUNNY_CDN_HOSTNAME;

  if (!tokenKey) return res.json({ url: videoUrl });

  try {
    const fullPath  = new URL(videoUrl).pathname;          // /guid/playlist.m3u8
    const hashPath  = fullPath.replace(/^\//, "");         // guid/playlist.m3u8  (no leading /)
    const expiry    = Math.floor(Date.now() / 1000) + 14400;

    const hashInput = tokenKey + hashPath + expiry;
    console.log("[signed-url] hashInput:", hashInput);
    console.log("[signed-url] expiry:", expiry, "now:", Math.floor(Date.now() / 1000));

    const token = crypto
      .createHash("sha256")
      .update(hashInput)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    console.log("[signed-url] token:", token);

    return res.json({
      url: `https://${cdnHost}${fullPath}?token=${token}&expires=${expiry}`,
      token,
      expires: expiry,
    });
  } catch (err) {
    console.error("[signed-url] error:", err);
    return res.json({ url: videoUrl });
  }
}
