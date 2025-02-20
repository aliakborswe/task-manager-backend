const router = require('express').Router();
const userController = require('../controllers/userController')

router.post("/users", userController.createNewUser);

module.exports = router;