const router = require('express').Router()
const ShoesController = require('../Controllers/shoesController')
router.get('/',ShoesController.readShoes)
module.exports = router