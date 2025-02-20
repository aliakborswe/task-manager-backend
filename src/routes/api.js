const router = require('express').Router();
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')

// user routes
router.get("/users/:email", userController.getUserByEmail);
router.post("/users", userController.createNewUser);

// task routes
router.get("/tasks/:userId", taskController.getTasksForUser);
router.post("/tasks", taskController.createNewTask);  
router.put("/tasks/:taskId", taskController.updateTask);
router.delete("/tasks/:taskId", taskController.deleteTask);

module.exports = router;