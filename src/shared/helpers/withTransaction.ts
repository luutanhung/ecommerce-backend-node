import mongoose from "mongoose";

/**
 * Wrapper to initiate transaction in MongoDB.
 */
export async function withTransaction<T>(
  callback: (session: mongoose.ClientSession) => Promise<T>,
): Promise<T> {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      return await callback(session);
    });
  } finally {
    await session.endSession();
  }
}
