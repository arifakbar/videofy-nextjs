import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successfull");
  } catch (err) {
    console.log("[Connection Error] ".err);
  }
}
