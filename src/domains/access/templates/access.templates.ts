import type { BuildVerifyEmailTemplateInput } from "./types/access.template.types.js";

export const buildVerifyEmailTemplate = ({
  name,
  verificationUrl,
  brandName = "Ecommerce Backend Node",
  supportEmail = "luutanhung.dev@gmail.com",
  companyName = "HungTech's Innovations",
  year = new Date().getFullYear(),
}: BuildVerifyEmailTemplateInput) => {
  return `
     <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - ${brandName}</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .button { display: block !important; width: 100% !important; }
          .content { padding: 20px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Main Card -->
        <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(120deg, #2980b9, #8e44ad); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">${brandName}</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Email Verification</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 22px;">Hi ${name || "there"}! 🙌</h2>
            
            <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
              Thanks for signing up! To ensure the security of your account and access all features, please verify your email address.
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; background-color: #3498db; color: white; text-decoration: none; padding: 14px 35px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 8px rgba(52,152,219,0.3);">
                ✓ Verify Email Address
              </a>
            </div>
            
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #6c757d;">
                <strong>Why verify?</strong>
              </p>
              <ul style="margin: 0; padding-left: 20px; color: #6c757d; font-size: 14px;">
                <li>Secure your account</li>
                <li>Reset password when needed</li>
                <li>Receive important updates</li>
                <li>Access all features</li>
              </ul>
            </div>
            
            <p style="margin: 0; color: #999; font-size: 13px; text-align: center;">
              Link expires in 24 hours • 
              <a href="${verificationUrl}" style="color: #3498db;">Click if button doesn't work</a>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #6c757d;">
              ${companyName} • <a href="mailto:${supportEmail}" style="color: #3498db;">${supportEmail}</a>
            </p>
            <p style="margin: 0; font-size: 12px; color: #6c757d;">
              © ${year} All rights reserved.
            </p>
          </div>
        </div>
        
        <!-- Post-script -->
        <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
          If you didn't create an account with ${brandName}, please ignore this email.
        </p>
      </div>
    </body>
    </html>
  `;
};
