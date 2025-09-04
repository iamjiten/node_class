import mongoose from "mongoose";

export const connectDb = (MONGO_URI: string) => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected!"))
    .catch((err) => {
      console.log({ err });
    });
};
