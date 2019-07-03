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

    static create(req,res){
        Model.Shoe.create(req.body)
            .then(shoe =>{
                res.redirect('/')
            })
            .catch(err=>{
                res.send(err)
            })
    }

}

module.exports = ShoesController