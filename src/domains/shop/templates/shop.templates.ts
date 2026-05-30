import type { BuildVerifyShopEmailTemplateInput } from "./types/shop.templates.types.js";

export const buildVerifyShopEmailTemplate = ({
  shopName,
  ownerName,
  verificationUrl,
  brandName = "Ecommerce Backend Node",
  supportEmail = "luutanhung.dev@gmail.com",
  companyName = "HungTech's Innovations",
  year = new Date().getFullYear(),
  registrationDate = new Date().toLocaleDateString(),
}: BuildVerifyShopEmailTemplateInput) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Shop - ${shopName} | ${brandName}</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .button { display: block !important; width: 100% !important; }
          .content { padding: 20px !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Main Card -->
        <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          
          <!-- Header - Shop Specific Gradient -->
          <div style="background: linear-gradient(135deg, #f39c12, #e67e22, #d35400); padding: 40px 30px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">🏪</div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Verify Your Shop</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">${shopName}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 22px;">Hello ${ownerName || "Shop Owner"}! 🎉</h2>
            
            <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
              Thank you for registering your shop <strong>${shopName}</strong> on our platform! 
              To start selling and reach millions of customers, please verify your shop email address.
            </p>
            
            <!-- Shop Information Summary -->
            <div style="background: linear-gradient(135deg, #fff5e6, #fff0e0); border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #ffe0b3;">
              <p style="margin: 0 0 10px 0; font-weight: 700; color: #e67e22; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                📋 Shop Details
              </p>
              <table style="width: 100%; font-size: 14px;">
                <tr>
                  <td style="padding: 5px 0; color: #666;">Shop Name:</td>
                  <td style="padding: 5px 0; color: #333; font-weight: 600;">${shopName}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #666;">Registration Date:</td>
                  <td style="padding: 5px 0; color: #333; font-weight: 600;">${registrationDate}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #666;">Owner:</td>
                  <td style="padding: 5px 0; color: #333; font-weight: 600;">${ownerName}</td>
                </tr>
              </table>
            </div>
            
            <!-- Verification Button -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; background: linear-gradient(135deg, #f39c12, #e67e22); color: white; text-decoration: none; padding: 14px 35px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(243,156,18,0.3);">
                🏪 Verify Shop Email
              </a>
            </div>
            
            <!-- Benefits Section -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin: 25px 0;">
              <p style="margin: 0 0 15px 0; font-weight: 700; color: #2c3e50; font-size: 16px;">
                ✨ What you get after verification:
              </p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">✅</span>
                  <span style="font-size: 14px; color: #555;">Start selling products</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">📊</span>
                  <span style="font-size: 14px; color: #555;">Access seller dashboard</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">💰</span>
                  <span style="font-size: 14px; color: #555;">Payment processing</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">📈</span>
                  <span style="font-size: 14px; color: #555;">Analytics & reports</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">🛠️</span>
                  <span style="font-size: 14px; color: #555;">Inventory management</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">📞</span>
                  <span style="font-size: 14px; color: #555;">Priority support</span>
                </div>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div style="border-left: 4px solid #f39c12; background-color: #fff9f0; padding: 15px; margin: 25px 0; border-radius: 8px;">
              <p style="margin: 0 0 8px 0; font-weight: 700; color: #e67e22;">📝 Next Steps:</p>
              <ol style="margin: 0; padding-left: 20px; color: #555; font-size: 14px;">
                <li>Click the verification button above</li>
                <li>Complete your shop profile (logo, banner, description)</li>
                <li>Add your first products</li>
                <li>Set up payment and shipping methods</li>
                <li>Start selling! 🚀</li>
              </ol>
            </div>
            
            <p style="margin: 0; color: #999; font-size: 13px; text-align: center;">
              Link expires in 24 hours • 
              <a href="${verificationUrl}" style="color: #f39c12;">Click if button doesn't work</a>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #6c757d;">
              ${companyName} • <a href="mailto:${supportEmail}" style="color: #f39c12;">${supportEmail}</a>
            </p>
            <p style="margin: 0; font-size: 12px; color: #6c757d;">
              © ${year} All rights reserved.
            </p>
          </div>
        </div>
        
        <!-- Help Section -->
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 12px; color: #999; margin: 0 0 5px 0;">
            Need help setting up your shop?
          </p>
          <p style="font-size: 12px; color: #999; margin: 0;">
            <a href="mailto:${supportEmail}" style="color: #f39c12;">Contact our seller support</a> • 
            <a href="#" style="color: #f39c12;">Seller Guide</a>
          </p>
          <p style="font-size: 12px; color: #999; margin-top: 10px;">
            If you didn't register a shop on ${brandName}, please <a href="mailto:${supportEmail}" style="color: #f39c12;">report this</a>.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
