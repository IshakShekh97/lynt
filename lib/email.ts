import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Lynt <onboarding@resend.dev>", // Replace with your verified domain
      to: [to],
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error(`Email sending failed: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendVerificationEmail({
  email,
  url,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const subject = "Verify your email address";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🔗 Verify Your Email</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          Hey there! Welcome to Lynt. Click the button below to verify your email address and get started.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 12px 30px; 
                    text-decoration: none; 
                    border-radius: 25px; 
                    font-weight: bold; 
                    display: inline-block;
                    transition: transform 0.2s ease;">
            Verify Email Address
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666; margin-top: 20px;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="font-size: 14px; color: #667eea; word-break: break-all;">
          ${url}
        </p>
        
        <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          This verification link will expire in 24 hours. If you didn't create an account with Lynt, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  const text = `
    Welcome to Lynt!
    
    Please verify your email address by clicking the following link:
    ${url}
    
    If the link doesn't work, copy and paste it into your browser.
    
    This verification link will expire in 24 hours.
    
    If you didn't create an account with Lynt, you can safely ignore this email.
  `;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
}

export async function sendPasswordResetEmail({
  email,
  url,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const subject = "Reset your password";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🔒 Reset Your Password</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          We received a request to reset your password for your Lynt account. Click the button below to create a new password.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" 
             style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
                    color: white; 
                    padding: 12px 30px; 
                    text-decoration: none; 
                    border-radius: 25px; 
                    font-weight: bold; 
                    display: inline-block;
                    transition: transform 0.2s ease;">
            Reset Password
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666; margin-top: 20px;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="font-size: 14px; color: #ff6b6b; word-break: break-all;">
          ${url}
        </p>
        
        <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          This password reset link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  const text = `
    Password Reset Request
    
    We received a request to reset your password for your Lynt account.
    
    Click the following link to reset your password:
    ${url}
    
    If the link doesn't work, copy and paste it into your browser.
    
    This password reset link will expire in 1 hour.
    
    If you didn't request a password reset, you can safely ignore this email.
  `;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
}
