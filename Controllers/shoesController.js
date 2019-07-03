const Model = require('../models/index')

class ShoesController {
    static readShoes(req,res) {
        Model.Shoe.findAll()
            .then((data) => {
                res.render('shoes.ejs',{data:data})
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = ShoesController