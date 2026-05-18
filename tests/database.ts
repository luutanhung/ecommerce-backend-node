import mongoose from "mongoose";

export const dropCollections = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  await Promise.all(
    Object.values(collections).map((collection) => collection.deleteMany({})),
  );
  console.log("Test MongoDB collections cleared");
};
