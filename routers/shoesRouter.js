const router = require('express').Router()
const ShoesController = require('../Controllers/shoesController')
const cekAdmin = require('../middlewares/cekAdmin')

router.get('/',ShoesController.readShoes)
router.get('/add', )
router.post('/add', cekAdmin, ShoesController.create)

router.get('/edit/:id', )
router.post('/edit/:id', cekAdmin, )

router.get('/delete/:id', )
module.exports = router