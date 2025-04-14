const express = require('express')
let router = express.Router();
const middleware = require('../middleware/auth.middleware')
const login = require('../controller/login.controller')
const register = require('../controller/register.controller')
const userController = require('../controller/userController')
const messageController = require('../controller/mesage.controller')

router.post('/auth/register', register.UserRegisteration)
router.post('/auth/login', login.UserLogin)
router.get('/users', userController.GetAllUsers);

router.post('/messages', messageController.getMessagesBetweenUsers);

module.exports = router;
