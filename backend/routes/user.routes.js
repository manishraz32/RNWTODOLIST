import express from "express";
import { getUserWithTask } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/get-user-and-tasks/:userId", getUserWithTask);


export default router;