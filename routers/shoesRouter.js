const router = require('express').Router()
const ShoesController = require('../Controllers/shoesController')
const cekAdmin = require('../middlewares/cekAdmin')
const userLogin = require('../middlewares/userLogin')

//multer
var multer = require('multer')
const path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'views/images/shoes')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name + ".jpg")
  }
})
var upload = multer({ 
    storage: storage 
})
.single('ShoesImage')
//

router.get('/', ShoesController.readShoes)
router.get('/add', userLogin,cekAdmin, (req, res)=>{
    res.render('addShoes.ejs')
})
router.post('/add', userLogin, cekAdmin, upload, ShoesController.create)
router.get('/edit/:id', userLogin, cekAdmin, ShoesController.getEditPage)
router.post('/edit/:id', userLogin, cekAdmin, ShoesController.edit)
router.get('/delete/:id',  userLogin, cekAdmin, ShoesController.delete)
router.get('/Shoes/:type', ShoesController.readType)
router.get('/cart/:shoesId', userLogin, ShoesController.addToCart)
router.get('/:brand', ShoesController.readBrand)
router.get('/:brand/:type', ShoesController.readBrandType)

module.exports = router