import type { SendMailInput } from "./types/mail.service.types.js";

import { config } from "../../configs/index.js";

import { mailTransporter } from "./mail.transporter.js";

export class MailService {
  static async send({ to, subject, html }: SendMailInput) {
    await mailTransporter.sendMail({
      from: config.mail.user,
      to,
      subject,
      html,
    });
  }
}
