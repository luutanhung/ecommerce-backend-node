import nodemailer from "nodemailer";

import { config } from "../../configs/index.js";

export const mailTransporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
});
