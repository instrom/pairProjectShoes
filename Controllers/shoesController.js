const Model = require('../models/index')

const UserController = require('../Controllers/userController')

const formatMoney = require('../helpers/formatMoney')


class ShoesController {
    static readShoes(req,res) {
        Model.Shoe.findAll()
            .then((data) => {
                res.render('shoes.ejs',{
                    data: data,
                    brand: 'Shoes',
                    formatMoney:formatMoney
                })
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
                res.render('shoes.ejs', {
                    data: shoes,
                    brand: req.params.brand,
                    formatMoney:formatMoney
                })
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static readType(req,res){
        Model.Shoe.findAll({
            where: {
                type : req.params.type
            }
        })  
            .then(shoes =>{
                res.render('shoes.ejs', {
                    data: shoes,
                    brand: 'Shoes',
                    formatMoney:formatMoney
                })
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static readBrandType(req,res){
        Model.Shoe.findAll({
            where:{
                brand: req.params.brand,
                type: req.params.type
            }
        })
            .then(shoes=>{
                res.render('shoes.ejs', {
                    data: shoes,
                    brand: req.params.brand,
                    type: req.params.type,
                    formatMoney:formatMoney
                })
            })
            .catch(err =>{
                res.send(err)
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

    static addToCart(req,res){
        Model.Shoe.findByPk(req.params.shoesId)
        .then(shoe =>{
            console.log(shoe.dataValues)
            Model.ShoesUser.findOrCreate({
                where:{
                    UserId : req.session.user.id,
                    ShoeId : req.params.shoesId,
                },
                defaults:{
                    quantity : 1,
                    totalPrice: shoe.dataValues.price
                }
            })
            .then(([result, created])=>{
               if(!created) {
                    UserController.addToCart(req,res)
               } else {
                   res.redirect('/shoes')        
               }
            })
            .catch(err =>{
                res.send(err)
            })
        })
        .catch(err=>{
            res.send(err)
        })
        
    }

    static getEditPage(req,res){
        Model.Shoe.findByPk(req.params.id)
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