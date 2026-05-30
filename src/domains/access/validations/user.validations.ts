import { z } from "zod";

export const UserIdSchema = z.string().min(8);

export const UserParamsSchema = z.object({
  userId: UserIdSchema,
});
export type UserParams = z.infer<typeof UserParamsSchema>;
