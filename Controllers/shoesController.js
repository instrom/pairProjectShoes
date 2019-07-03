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

    static readBrand(req,res){
        Model.Shoe.findAll({
            where: {
                brand : req.params.brand
            }
        })  
            .then(shoes =>{
                res.render('shoes.ejs', {data: shoes})
            })
    }

    static create(req,res){
        Model.Shoe.create(req.body)
            .then(data =>{
                res.redirect('/')
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static getEditPage(req,res){
        Model.Shoe.findByPK(req.params.id)
            .then(data =>{
                res.render('editShoes.ejs', {
                    data: data
                })
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static edit(req, res) {
        let obj = {
            name: req.body.name,
            brand: req.body.brand,
            type: req.body.type,
            price: req.body.price
        }
        Shoe.update(obj, {
                where: {
                    id: req.params.id
                }
            })
            .then(updates => {
                res.redirect('/shoes')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res) {
        Subject.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data=> {
                res.redirect('/shoes')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ShoesController