const router = require('express').Router()
const UserController = require('../Controllers/userController')
const sessionChecker = require('../middlewares/sessionChecker')
router.get('/register',UserController.createUser)
router.post('/register',UserController.createUserPost)
router.get('/login',sessionChecker,UserController.loginUser)
module.exports = router