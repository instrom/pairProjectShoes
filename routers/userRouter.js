const router = require('express').Router()
const UserController = require('../Controllers/userController')
const sessionChecker = require('../middlewares/sessionChecker')
router.get('/register',UserController.createUser)
router.post('/register',UserController.createUserPost)
router.get('/login',sessionChecker,UserController.loginUser)
router.post('/login',UserController.loginUserPost)
router.get('/dashboard',UserController.dashboard)
module.exports = router