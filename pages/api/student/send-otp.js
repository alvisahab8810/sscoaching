// import dbConnect from "@/lib/dbConnect";
// import OTP from "@/models/OTP";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }

//   await dbConnect();

//   try {
//     const { phone } = req.body;

//     // Validate phone
//     if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid 10-digit phone number",
//       });
//     }

//     // Generate 6 digit OTP
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//     // Delete any existing OTP for this phone
//     await OTP.deleteMany({ phone });

//     // Save new OTP with 5 min expiry
//     await OTP.create({
//       phone,
//       otp: otpCode,
//       expiresAt: new Date(Date.now() + 5 * 60 * 1000),
//     });

//     // Send OTP via MSG91
//     const authKey = process.env.MSG91_AUTH_KEY;
//     const templateId = process.env.MSG91_TEMPLATE_ID;

//     const payload = {
//       template_id: templateId,
//       mobile: `91${phone}`,
//       authkey: authKey,
//       otp: otpCode,
//     };

//     console.log("Sending OTP via MSG91 to:", `91${phone}`);

//     const response = await fetch("https://control.msg91.com/api/v5/otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authkey: authKey,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();
//     console.log("MSG91 response:", data);

//     if (data.type === "success") {
//       return res.status(200).json({
//         success: true,
//         message: `OTP sent successfully to ${phone}`,
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: data.message || "Failed to send OTP. Please try again.",
//       });
//     }
//   } catch (error) {
//     console.error("Send OTP error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Server error",
//     });
//   }
// }



import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/OTP";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { phone } = req.body;

    // Validate phone
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit phone number",
      });
    }

    // Generate 6 digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTP for this phone
    await OTP.deleteMany({ phone });

    // Save new OTP with 5 min expiry
    await OTP.create({
      phone,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // =============================================
    // DEVELOPMENT MODE — skip real SMS
    // Just log OTP in terminal for testing
    // =============================================
    if (process.env.NODE_ENV === "development") {
      console.log("=================================");
      console.log(`📱 OTP for ${phone} : ${otpCode}`);
      console.log("=================================");

      return res.status(200).json({
        success: true,
        message: `OTP sent to ${phone} (check terminal in dev mode)`,
      });
    }

    // =============================================
    // PRODUCTION MODE — real SMS via Fast2SMS
    // Uncomment and configure when deploying
    // =============================================

    // const apiKey = process.env.FAST2SMS_API_KEY;
    // const message = `${otpCode} is your OTP for SS Coaching login. Valid for 5 minutes. Do not share.`;
    // const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q_json&message=${encodeURIComponent(message)}&language=english&flash=0&numbers=${phone}`;
    // const response = await fetch(url, { method: "GET" });
    // const data = await response.json();
    // if (data.return !== true) {
    //   return res.status(500).json({ success: false, message: data.message || "Failed to send OTP" });
    // }

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${phone}`,
    });

  } catch (error) {
    console.error("Send OTP error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}