import { Router } from "express";
import {
  getUserByEmail,
  createNewUser,
} from "../controllers/userController.js";
import {
  getTasksForUser,
  createNewTask,
  updateTask,
  deleteTask,
  updateTaskOrder,
} from "../controllers/taskController.js";

const router = Router();

// user routes
router.get("/users/:email", getUserByEmail);
router.post("/users", createNewUser);

// task routes
router.get("/tasks/:email", getTasksForUser);
router.put("/tasks/reorder", updateTaskOrder);
router.post("/tasks", createNewTask);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

export default router;
