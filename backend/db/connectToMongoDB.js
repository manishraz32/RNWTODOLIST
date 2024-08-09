import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URI);
        console.log("db connected");
    } catch (error) {
        console.log("Error connecting to mongoDB", error.message);
    }
}

export default connectToMongoDB;