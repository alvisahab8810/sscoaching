import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title } = req.body;
  const libraryId = process.env.BUNNY_LIBRARY_ID;
  const apiKey    = process.env.BUNNY_API_KEY;
  const cdnHost   = process.env.BUNNY_CDN_HOSTNAME;

  if (!libraryId || !apiKey || !cdnHost) {
    return res.status(500).json({
      error: "Bunny Stream is not configured. Add BUNNY_LIBRARY_ID, BUNNY_API_KEY, and BUNNY_CDN_HOSTNAME to .env.local",
    });
  }

  try {
    // Step 1: create a video entry in Bunny to get the videoId (guid)
    const bunnyRes = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
      method:  "POST",
      headers: {
        "AccessKey":    apiKey,
        "Content-Type": "application/json",
        "accept":       "application/json",
      },
      body: JSON.stringify({ title: title?.trim() || "Untitled Lesson" }),
    });

    const data = await bunnyRes.json();

    if (!bunnyRes.ok || !data.guid) {
      console.error("Bunny create error:", data);
      return res.status(500).json({ error: "Failed to create video on Bunny Stream" });
    }

    // Step 2: generate TUS auth signature (valid 6 hours)
    // Formula: SHA256(libraryId + apiKey + expiryTimestamp + videoId)
    const tusExpiry    = Math.floor(Date.now() / 1000) + 21600;
    const tusSignature = crypto
      .createHash("sha256")
      .update(libraryId + apiKey + tusExpiry + data.guid)
      .digest("hex");

    const cdnUrl = `https://${cdnHost}/${data.guid}/playlist.m3u8`;

    return res.status(200).json({
      success:      true,
      videoId:      data.guid,
      cdnUrl,
      tusSignature,
      tusExpiry,
      libraryId,
    });
  } catch (err) {
    console.error("Bunny create-video error:", err);
    return res.status(500).json({ error: "Network error reaching Bunny Stream" });
  }
}
