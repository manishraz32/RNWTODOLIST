import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from "./db/connectToMongoDB.js";


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();  

app.use(express.json({ limit: "10mb", extended: true })); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

// app.get('/', (req, res) => {
    // res.json("hello everone");
// })


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
})