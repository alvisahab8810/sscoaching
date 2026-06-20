import cookie from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("subadmin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })
  );

  return res.status(200).json({ success: true });
}
