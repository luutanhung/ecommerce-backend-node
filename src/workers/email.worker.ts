import { Worker } from "bullmq";

import { InternalSystemError } from "../core/error/internalSystemError.js";

import { EMAIL_JOB_NAME } from "../shared/constants/queue.constants.js";
import { ResCode } from "../shared/constants/resCode.constants.js";
import { generateEmailVerificationToken } from "../shared/utils/token.utils.js";

import { buildVerifyEmailTemplate } from "../domains/access/templates/access.templates.js";

import { config } from "../configs/index.js";

import type { SendVerificationEmailJob } from "./types/email.worker.types.js";

import { MailService } from "../libs/mail/mail.service.js";
import { redisConnection } from "../libs/redis/index.js";

export const emailWorker = new Worker(
  "email",
  async (job) => {
    if (job.name === EMAIL_JOB_NAME.SEND_VERIFICATION_EMAIL) {
      const { userId, email, name } = job.data as SendVerificationEmailJob;

      const token = generateEmailVerificationToken(userId);

      const verificationUrl = `${config.client.url}/verify-email?token=${token}`;

      const html = buildVerifyEmailTemplate({
        name,
        verificationUrl,
      });

      await MailService.send({
        to: email,
        subject: "Verify your email",
        html,
      });
    } else {
      throw new InternalSystemError({
        code: ResCode.JOB_NAME_UNKNOWN,
      });
    }
  },
  {
    connection: redisConnection,
  },
);
