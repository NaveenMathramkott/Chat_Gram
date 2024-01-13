import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${connect.connection.host} 🫒🫒`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
