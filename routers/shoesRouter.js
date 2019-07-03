const router = require('express').Router()
const ShoesController = require('../Controllers/shoesController')
const cekAdmin = require('../middlewares/cekAdmin')
const userLogin = require('../middlewares/userLogin')

router.get('/',ShoesController.readShoes)
router.get('/add', )
router.post('/add', userLogin, cekAdmin, ShoesController.create)

router.get('/edit/:id', userLogin, cekAdmin, ShoesController.getEditPage)
router.post('/edit/:id', userLogin, cekAdmin, ShoesController.edit)

router.get('/delete/:id', )
module.exports = router