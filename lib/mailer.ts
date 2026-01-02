// lib/mailer.ts
import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

const teamTransporter = nodemailer.createTransport({
  service: process.env.TEAM_SMTP_SERVICE,
  auth: {
    user: process.env.TEAM_EMAIL_USER, // Your email address
    pass: process.env.TEAM_EMAIL_PASS, // Your email password or app password
  },
});

const notificationTransporter = nodemailer.createTransport({
  service: process.env.NOTIFICATION_SMTP_SERVICE,
  auth: {
    user: process.env.NOTIFICATION_EMAIL_USER, // Your email address
    pass: process.env.NOTIFICATION_EMAIL_PASS, // Your email password or app password
  },
});

export async function sendVerificationEmail(to: string, code: string) {
  const mailOptions = {
    from: `"TicketNests" <${process.env.NOTIFICATION_EMAIL_USER}>`,
    to,
    subject: "🔐 Email Verification Code – TicketNests",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #1e40af;">Verify Your Email</h2>
        <p>Hello,</p>

        <p>You're almost there! Use the verification code below to verify your <strong>TicketNests</strong> account:</p>

        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; padding: 12px 24px; background-color: #1e40af; color: #fff; font-size: 24px; letter-spacing: 4px; border-radius: 6px;">
            ${code}
          </span>
        </div>

        <p>This code is valid for a limited time. If you didn’t initiate this request, you can safely ignore this email.</p>

        <p>Thanks,<br/>The TicketNests Team</p>

        <hr style="margin-top: 30px;"/>
        <p style="font-size: 12px; color: #777;">
          This is an automated message. Please do not reply directly to this email.
        </p>
      </div>
    `,
  };

  await notificationTransporter.sendMail(mailOptions);
}

export async function sendWelcomeEmail(to: string) {
  const mailOptions = {
    from: `"TicketNests" <${process.env.TEAM_EMAIL_USER}>`,
    to,
    subject: "🎉 Welcome to TicketNests – Let's Get You Started!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1e40af;">Welcome to TicketNests! 🎉</h2>
        <p>Hi there,</p>

        <p>We’re thrilled to have you join the TicketNests community! Whether you’re here to explore amazing events or host unforgettable experiences, you're in great company.</p>

        <p>Here’s what you can do next:</p>
        <ul>
          <li>🎟️ Buy or reserve tickets for upcoming events</li>
          <li>📅 Manage your events with powerful tools</li>
          <li>🤝 Connect with a vibrant audience and community</li>
        </ul>

        <p>If you have any questions or need support, we’re just an email away.</p>

        <p>Thanks for joining us, and welcome once again!</p>

        <p>Cheers,<br/>The TicketNests Team</p>

        <hr style="margin-top: 30px;"/>
        <p style="font-size: 12px; color: #777;">
          You’re receiving this email because you signed up for TicketNests. If you didn’t, please ignore this message.
        </p>
      </div>
    `,
  };

  await teamTransporter.sendMail(mailOptions);
}

export async function resendOtpEmail(to: string, otp: string): Promise<void> {
  const mailOptions = {
    from: `"TicketNests" <${process.env.NOTIFICATION_EMAIL_USER}>`,
    to,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family: sans-serif; padding: 1rem;">
        <h2>🔐 Your OTP Code</h2>
        <p>Use the following code to verify your admin login:</p>
        <h1 style="letter-spacing: 2px;">${otp}</h1>
        <p>This code will expire shortly. If you did not request this, please ignore.</p>
      </div>
    `,
  };

  await notificationTransporter.sendMail(mailOptions);
}

export const sendTicketMail = async ({
  to,
  subject,
  html,
  attachments,
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[]; // Optional array of attachments
}) => {
  try {
    const info = await notificationTransporter.sendMail({
      from: `"TicketNests" <${process.env.NOTIFICATION_EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    });

    console.log("Ticket mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending ticket mail:", error);
    throw error;
  }
};

export const sendFailureMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const info = await notificationTransporter.sendMail({
      from: `"TicketNests" <${process.env.NOTIFICATION_EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Failure mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending failure mail:", error);
    throw error;
  }
};

export async function sendPayoutRequestToTeam(details: {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  reference: string;
}) {
  const { amount, bankName, accountNumber, accountName, reference } = details;

  const mailOptions = {
    from: `"TicketNests Alerts" <${process.env.NOTIFICATION_EMAIL_USER}>`,
    to: process.env.TEAM_EMAIL_USER, // Set this in your .env
    subject: `💸 New Payout Request – ${reference}`,
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h3>New Payout Request Received</h3>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
        <p><strong>Bank:</strong> ${bankName}</p>
        <p><strong>Account Number:</strong> ${accountNumber}</p>
        <p><strong>Account Name:</strong> ${accountName}</p>
        <p><strong>Request Time:</strong> ${new Date().toLocaleString()}</p>
        <hr/>
        <p>Login to your admin dashboard to approve or reject this request.</p>
      </div>
    `,
  };

  await notificationTransporter.sendMail(mailOptions);
}

export async function sendPayoutConfirmationToUser(
  to: string,
  details: {
    amount: number;
    reference: string;
  }
) {
  const { amount, reference } = details;

  const mailOptions = {
    from: `"TicketNests" <${process.env.NOTIFICATION_EMAIL_USER}>`,
    to,
    subject: `✅ Payout Request Submitted – ${reference}`,
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h3>Your payout request has been submitted!</h3>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
        <p>Your request is currently being reviewed and will be processed within <strong>48 hours</strong>.</p>
        <p>You’ll receive another email once it has been completed.</p>
        <br/>
        <p>Thanks for using TicketNests.</p>
        <p>— TicketNests Team</p>
      </div>
    `,
  };

  await notificationTransporter.sendMail(mailOptions);
}
