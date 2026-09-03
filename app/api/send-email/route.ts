import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@mykrishnatravels.in";

    const body = await request.json();
    const {
      name = "Traveller",
      phone = "N/A",
      email = "N/A",
      destination = "N/A",
      date = "N/A",
      travellers = "N/A",
      budget = "N/A",
      message = "",
      formSource = "Website Enquiry Form",
      utm_source,
      utm_medium,
    } = body;

    console.log("--------------------------------------------------");
    console.log("📬 [Email API] Processing new lead enquiry:");
    console.log("   • Name:", name);
    console.log("   • Destination:", destination);
    console.log("   • Admin Recipient (TO_EMAIL):", recipientEmail);
    console.log("   • Customer Email:", email);
    console.log("--------------------------------------------------");

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured in .env.local. Email notification skipped.");
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY is not configured. Please add your Resend API key to .env.local",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 1. Admin Email Template (New Lead Alert)
    const adminHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
            .badge { display: inline-block; background-color: #ef4444; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .content { padding: 24px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            .table th, .table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .table th { background-color: #f8fafc; color: #64748b; font-weight: 600; width: 35%; }
            .table td { color: #0f172a; font-weight: 500; }
            .message-box { background-color: #f8fafc; border-left: 4px solid #ef4444; padding: 14px; border-radius: 0 8px 8px 0; margin-top: 16px; font-size: 14px; color: #334155; }
            .footer { background-color: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
            .button { display: inline-block; background-color: #25d366; color: #ffffff; font-weight: 700; padding: 12px 24px; text-decoration: none; border-radius: 10px; margin-top: 16px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">🔥 New Trip Enquiry</span>
              <h1>My Krishna Travels</h1>
              <p>Source: ${formSource}</p>
            </div>
            
            <div class="content">
              <h2 style="font-size: 16px; color: #0f172a; margin-top: 0; margin-bottom: 12px;">Customer Enquiry Details</h2>
              <table class="table">
                <tr><th>Full Name</th><td><strong>${name}</strong></td></tr>
                <tr><th>Phone / WhatsApp</th><td><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #ef4444; font-weight: 700; text-decoration: none;">${phone}</a></td></tr>
                ${email !== "N/A" ? `<tr><th>Customer Email</th><td><a href="mailto:${email}">${email}</a></td></tr>` : ""}
                <tr><th>Destination</th><td><strong>${destination}</strong></td></tr>
                <tr><th>Travel Date</th><td>${date}</td></tr>
                <tr><th>Travellers</th><td>${travellers}</td></tr>
                ${budget !== "N/A" ? `<tr><th>Budget</th><td>${budget}</td></tr>` : ""}
                ${utm_source ? `<tr><th>Campaign Source</th><td>${utm_source} (${utm_medium || "organic"})</td></tr>` : ""}
              </table>

              ${
                message
                  ? `<div class="message-box">
                      <strong>Notes / Special Requests:</strong><br/>
                      ${message.replace(/\n/g, "<br/>")}
                    </div>`
                  : ""
              }

              <div style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Namaste ${name}! Thank you for contacting My Krishna Travels regarding your trip to ${destination}. I am happy to help you with the customized itinerary!`)}" class="button">
                  💬 Reply Instantly on WhatsApp
                </a>
              </div>
            </div>

            <div class="footer">
              Sent automatically by My Krishna Travels System
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Customer Welcome Email Template
    const userHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: #ffffff; padding: 32px 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
            .header p { margin: 8px 0 0; font-size: 14px; color: #fecdd3; }
            .content { padding: 28px 24px; }
            .welcome-card { background: #fff5f5; border: 1px solid #fee2e2; border-radius: 12px; padding: 18px; margin-bottom: 20px; }
            .welcome-card h3 { margin: 0 0 6px; color: #991b1b; font-size: 16px; }
            .welcome-card p { margin: 0; font-size: 14px; color: #7f1d1d; line-height: 1.5; }
            .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            .table th, .table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .table th { background-color: #f8fafc; color: #64748b; font-weight: 600; width: 35%; }
            .table td { color: #0f172a; font-weight: 500; }
            .highlight-box { background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; border-radius: 0 10px 10px 0; margin-top: 20px; font-size: 14px; color: #14532d; }
            .footer { background-color: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
            .button { display: inline-block; background-color: #25d366; color: #ffffff; font-weight: 700; padding: 12px 24px; text-decoration: none; border-radius: 10px; margin-top: 16px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌸 Welcome to My Krishna Travels</h1>
              <p>Aapki Yatra Sabse Shandar & Memorable Hogi!</p>
            </div>
            
            <div class="content">
              <div class="welcome-card">
                <h3>Namaste ${name}! 🙏</h3>
                <p>My Krishna Travels par enquiry karne ke liye aapka bahut-bahut dhanyawad! Hum aapki dream trip ko <strong>best experience and best budget</strong> me plan karne ke liye taiyaar hain.</p>
              </div>

              <h3 style="font-size: 15px; color: #0f172a; margin-top: 20px; margin-bottom: 10px;">Aapki Trip Request Details:</h3>
              <table class="table">
                <tr><th>Destination</th><td><strong>${destination}</strong></td></tr>
                <tr><th>Travel Date</th><td>${date}</td></tr>
                <tr><th>Travellers</th><td>${travellers}</td></tr>
                ${budget !== "N/A" ? `<tr><th>Budget Preference</th><td>${budget}</td></tr>` : ""}
              </table>

              <div class="highlight-box">
                <strong>⚡ Next Step:</strong><br/>
                Hamare Senior Travel Expert aapko next <strong>15 se 30 minutes</strong> me customized itinerary aur special discounted quotes ke saath WhatsApp / Call karenge.
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://wa.me/919876543210?text=${encodeURIComponent(`Hi My Krishna Travels, main ${name} bol raha hu. Mujhe ${destination} trip ki details chahiye.`)}" class="button">
                  💬 Direct Chat on WhatsApp
                </a>
              </div>
            </div>

            <div class="footer">
              © My Krishna Travels • Premium Customized Tours & Packages<br/>
              Har Safar, Ek Pyari Yaad!
            </div>
          </div>
        </body>
      </html>
    `;

    // Send Admin Email
    const adminEmailPromise = resend.emails.send({
      from: "My Krishna Travels <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `✈️ New Enquiry: ${name} (${destination})`,
      html: adminHtmlContent,
    });

    // Send User Welcome Email (If user email is valid and provided)
    let userEmailPromise: Promise<any> = Promise.resolve(null);
    const hasValidUserEmail = email && email !== "N/A" && email.includes("@");

    if (hasValidUserEmail) {
      userEmailPromise = resend.emails.send({
        from: "My Krishna Travels <onboarding@resend.dev>",
        to: [email],
        subject: `🌸 Welcome ${name}! Aapki Yatra Sabse Best Hogi - My Krishna Travels`,
        html: userHtmlContent,
      }).catch((err) => {
        console.warn("Could not send email to customer (resend sandbox restriction or invalid address):", err?.message);
        return null;
      });
    }

    const [adminResult, userResult] = await Promise.all([adminEmailPromise, userEmailPromise]);

    console.log("✅ [Email API] Resend Dispatch Finished:");
    console.log("   • Admin Email Resend ID:", adminResult?.data?.id || "Failed");
    if (adminResult?.error) console.error("   ⚠️ Admin Email Error:", adminResult.error);
    if (userResult) console.log("   • User Email Resend ID:", userResult?.data?.id || "Failed/Skipped");

    return NextResponse.json({
      success: true,
      adminEmailSent: true,
      userEmailSent: Boolean(userResult),
      adminData: adminResult,
    });
  } catch (error: any) {
    console.error("Error sending email via Resend:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
