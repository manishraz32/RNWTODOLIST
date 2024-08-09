import express from "express";
import { createTask, updateTask, deleteTask } from "../controllers/task.controller.js";


const router = express.Router();

router.post("/create-task/:userId", createTask);

router.put("/update-task/:taskId", updateTask);

router.delete("/delete-task/:userId/:taskId", deleteTask);

export default router;