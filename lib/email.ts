import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Get email domain from environment or use default
const getEmailDomain = () => {
  // Use Resend's default domain if no custom domain is set
  const customDomain = process.env.RESEND_EMAIL_DOMAIN;
  return customDomain || "onboarding@resend.dev";
};

// Email templates with brutal styling
export const emailTemplates = {
  passwordReset: (user: { name?: string; email: string }, url: string) => ({
    from: getEmailDomain(),
    to: [user.email],
    subject: "🔥 BRUTAL PASSWORD RESET - Destroy & Rebuild! 💀",
    html: `
      <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #dc2626, #ea580c, #f59e0b); padding: 20px; border-radius: 12px; color: white;">
        <div style="background: rgba(0,0,0,0.8); padding: 30px; border-radius: 8px; border: 3px solid #dc2626;">
          <h1 style="color: #ef4444; font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 20px 0; text-align: center;">
            💀 PASSWORD ANNIHILATION REQUEST 💀
          </h1>
          <p style="font-size: 18px; font-weight: bold; margin: 15px 0;">Hey ${user.name || "Chaos Warrior"},</p>
          <p style="font-size: 16px; margin: 15px 0;">
            Someone (hopefully you) wants to BRUTALLY destroy your current password and forge a new one! 
            If this wasn't you, ignore this email and your password remains untouchable.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="display: inline-block; background: linear-gradient(45deg, #dc2626, #ea580c); color: white; padding: 15px 30px; text-decoration: none; font-weight: 900; text-transform: uppercase; border-radius: 8px; border: 2px solid #ffffff; font-size: 16px; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);">
              🔥 RESET PASSWORD NOW 🔥
            </a>
          </div>
          <div style="background: rgba(220, 38, 38, 0.2); padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <p style="margin: 0; font-size: 14px; font-weight: bold;">
              ⚠️ BRUTAL REMINDER: Check your spam folder if you don't see this email in your inbox!
            </p>
          </div>
          <p style="font-size: 14px; color: #fbbf24; margin: 20px 0 0 0;">
            This link expires in 1 hour. After that, you'll need to request another BRUTAL reset!
          </p>
        </div>
      </div>
    `,
  }),

  emailVerification: (user: { name?: string; email: string }, url: string) => ({
    from: getEmailDomain(),
    to: [user.email],
    subject: "💀 VERIFY YOUR EMAIL - Join the Brutal Revolution! 🔥",
    html: `
      <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #7c3aed, #dc2626, #ea580c); padding: 20px; border-radius: 12px; color: white;">
        <div style="background: rgba(0,0,0,0.8); padding: 30px; border-radius: 8px; border: 3px solid #7c3aed;">
          <h1 style="color: #a855f7; font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 20px 0; text-align: center;">
            ⚡ EMAIL VERIFICATION CHALLENGE ⚡
          </h1>
          <p style="font-size: 18px; font-weight: bold; margin: 15px 0;">Welcome to the chaos, ${user.name || "New Warrior"}!</p>
          <p style="font-size: 16px; margin: 15px 0;">
            Your brutal journey begins with EMAIL VERIFICATION! Click the button below to prove your worth and 
            unlock the full power of your account.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="display: inline-block; background: linear-gradient(45deg, #7c3aed, #dc2626); color: white; padding: 15px 30px; text-decoration: none; font-weight: 900; text-transform: uppercase; border-radius: 8px; border: 2px solid #ffffff; font-size: 16px; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);">
              💥 VERIFY & DOMINATE 💥
            </a>
          </div>
          <div style="background: rgba(220, 38, 38, 0.2); padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <p style="margin: 0; font-size: 14px; font-weight: bold;">
              ⚠️ BRUTAL REMINDER: Check your spam folder! Email providers sometimes fear our BRUTAL messages!
            </p>
          </div>
          <p style="font-size: 14px; color: #fbbf24; margin: 20px 0 0 0;">
            This verification link is your key to unlock ULTIMATE PROFILE POWER!
          </p>
        </div>
      </div>
    `,
  }),

  emailChange: (
    user: { name?: string; email: string },
    newEmail: string,
    url: string
  ) => ({
    from: getEmailDomain(),
    to: [user.email], // Send to current email for security
    subject: "🚨 CONFIRM EMAIL CHANGE - Security Protocol Activated! ⚡",
    html: `
      <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #dc2626, #ea580c, #f59e0b); padding: 20px; border-radius: 12px; color: white;">
        <div style="background: rgba(0,0,0,0.8); padding: 30px; border-radius: 8px; border: 3px solid #dc2626;">
          <h1 style="color: #ef4444; font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 20px 0; text-align: center;">
            🔥 EMAIL CHANGE AUTHORIZATION 🔥
          </h1>
          <p style="font-size: 18px; font-weight: bold; margin: 15px 0;">Security Alert, ${user.name || "Warrior"}!</p>
          <p style="font-size: 16px; margin: 15px 0;">
            Someone (hopefully you) wants to change your email from <strong>${user.email}</strong> to <strong>${newEmail}</strong>.
          </p>
          <p style="font-size: 16px; margin: 15px 0;">
            Click below to BRUTALLY approve this change and secure your new digital identity!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="display: inline-block; background: linear-gradient(45deg, #dc2626, #ea580c); color: white; padding: 15px 30px; text-decoration: none; font-weight: 900; text-transform: uppercase; border-radius: 8px; border: 2px solid #ffffff; font-size: 16px; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);">
              ⚡ APPROVE EMAIL CHANGE ⚡
            </a>
          </div>
          <div style="background: rgba(220, 38, 38, 0.2); padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <p style="margin: 0; font-size: 14px; font-weight: bold;">
              ⚠️ BRUTAL REMINDER: Check your spam folder! This security email might be hiding there!
            </p>
          </div>
          <p style="font-size: 14px; color: #fbbf24; margin: 20px 0 0 0;">
            If you didn't request this change, ignore this email. Your account remains secure!
          </p>
        </div>
      </div>
    `,
  }),
};

// Email service functions
export const emailService = {
  async sendPasswordReset(user: { name?: string; email: string }, url: string) {
    const emailData = emailTemplates.passwordReset(user, url);
    const { error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Password reset email error:", error);
      throw new Error("Failed to send password reset email");
    }
  },

  async sendEmailVerification(
    user: { name?: string; email: string },
    url: string
  ) {
    const emailData = emailTemplates.emailVerification(user, url);
    const { error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Email verification error:", error);
      throw new Error("Failed to send verification email");
    }
  },

  async sendEmailChangeConfirmation(
    user: { name?: string; email: string },
    newEmail: string,
    url: string
  ) {
    const emailData = emailTemplates.emailChange(user, newEmail, url);
    const { error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Email change verification error:", error);
      throw new Error("Failed to send email change verification");
    }
  },
};

export default emailService;
