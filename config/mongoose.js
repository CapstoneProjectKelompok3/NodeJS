import mongoose from "mongoose";
import 'dotenv/config'

export default async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('connected to mongodb atlas');
  } catch (err) {
    console.log('failed to connect mongodb', err);
  }
}