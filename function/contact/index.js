const { EmailClient } = require("@azure/communication-email");

const ACS_CONNECTION_STRING = process.env.ACS_CONNECTION_STRING;
const SENDER_ADDRESS = process.env.SENDER_ADDRESS;
const TO_ADDRESS = "info@ajautospecialists.com";

module.exports = async function (context, req) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    context.res = {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: ""
    };
    return;
  }

  const { name, phone, email, vehicle, service, message } = req.body || {};

  if (!name || !email) {
    context.res = {
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { success: false, error: "Name and email are required." }
    };
    return;
  }

  try {
    const client = new EmailClient(ACS_CONNECTION_STRING);

    const emailMessage = {
      senderAddress: `noreply@${SENDER_ADDRESS}`,
      recipients: {
        to: [{ address: TO_ADDRESS, displayName: "A&J Auto Services" }]
      },
      content: {
        subject: `New Contact Form Inquiry — ${service || "General"} | ${name}`,
        plainText: `
New inquiry from the A&J Auto Services website.

Name:     ${name}
Phone:    ${phone || "Not provided"}
Email:    ${email}
Vehicle:  ${vehicle || "Not provided"}
Service:  ${service || "Not specified"}

Message:
${message || "No message provided."}
        `.trim(),
        html: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f5f5f5;">
  <div style="background:#181818;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:#ffffff;margin:0;font-size:22px;">
      <span style="color:#d42020;">A&J</span> Auto Services
    </h1>
    <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px;">New Website Inquiry</p>
  </div>
  <div style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e0e0e0;">
    <h2 style="color:#181818;font-size:18px;margin:0 0 24px;border-bottom:2px solid #d42020;padding-bottom:12px;">
      Contact Details
    </h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:10px 0;color:#888;font-size:14px;width:120px;font-weight:600;">Name</td>
        <td style="padding:10px 0;color:#181818;font-size:14px;">${name}</td>
      </tr>
      <tr style="background:#f9f9f9;">
        <td style="padding:10px 8px;color:#888;font-size:14px;font-weight:600;">Phone</td>
        <td style="padding:10px 8px;color:#181818;font-size:14px;">${phone || "Not provided"}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;font-size:14px;font-weight:600;">Email</td>
        <td style="padding:10px 0;font-size:14px;">
          <a href="mailto:${email}" style="color:#d42020;">${email}</a>
        </td>
      </tr>
      <tr style="background:#f9f9f9;">
        <td style="padding:10px 8px;color:#888;font-size:14px;font-weight:600;">Vehicle</td>
        <td style="padding:10px 8px;color:#181818;font-size:14px;">${vehicle || "Not provided"}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;font-size:14px;font-weight:600;">Service</td>
        <td style="padding:10px 0;color:#181818;font-size:14px;">
          <span style="background:#d42020;color:#fff;padding:3px 10px;border-radius:50px;font-size:12px;font-weight:600;">
            ${service || "Not specified"}
          </span>
        </td>
      </tr>
    </table>
    ${message ? `
    <div style="margin-top:24px;padding:16px;background:#f5f5f5;border-left:3px solid #d42020;border-radius:4px;">
      <p style="color:#888;font-size:12px;font-weight:600;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Message</p>
      <p style="color:#181818;font-size:14px;line-height:1.6;margin:0;">${message}</p>
    </div>` : ""}
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e0e0e0;text-align:center;">
      <a href="mailto:${email}" style="display:inline-block;background:#d42020;color:#ffffff;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;">
        Reply to ${name}
      </a>
    </div>
  </div>
  <p style="text-align:center;color:#aaa;font-size:12px;margin-top:16px;">
    A&J Auto Services &mdash; ajautospecialists.com
  </p>
</body>
</html>
        `.trim()
      }
    };

    const poller = await client.beginSend(emailMessage);
    await poller.pollUntilDone();

    context.res = {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { success: true, message: "Message sent successfully." }
    };
  } catch (err) {
    context.log.error("Email send error:", err);
    context.res = {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { success: false, error: "Failed to send message. Please try again." }
    };
  }
};
