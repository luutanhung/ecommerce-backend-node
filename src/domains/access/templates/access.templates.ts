import type { BuildVerifyEmailTemplateInput } from "./types/access.template.types.js";

export const buildVerifyEmailTemplate = ({
  name,
  verificationUrl,
}: BuildVerifyEmailTemplateInput) => {
  return `
    <div>
      <h2>Hello ${name}</h2>

      <p>Please verify your email address.</p>

      <a href="${verificationUrl}">
        Verify Email
      </a>

      <p>This link expires in 24 hours.</p>
    </div>
  `;
};
