const router = require('express').Router()
const UserController = require('../Controllers/userController')
router.get('/register',UserController.createUser)
router.post('/register',UserController.createUserPost)
module.exports = router