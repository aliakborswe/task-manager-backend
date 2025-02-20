const router = require('express').Router();
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')

// user routes
router.post("/users", userController.createNewUser);

// task routes
router.post("/tasks", taskController.createNewTask);  

module.exports = router;