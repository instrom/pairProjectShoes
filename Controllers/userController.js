const Model = require('../models/index')
const sessionChecker = require('../middlewares/sessionChecker')
const formatMoney = require('../helpers/formatMoney')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const Shoe = Model.Shoe

class UserController {
    static createUser(req,res) {
        res.render('userRegistration.ejs',{flash:req.flash('errEmail')})
    }

    static createUserPost(req,res) {
        Model.User.create({
            username: req.body.username,
            email:req.body.email,
            password:req.body.password,
            balance: 0,
            isAdmin: false
        })
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => {
                req.flash('errEmail',`${err.message}`)
                res.redirect('/user/register')
            })
    }

    static loginUser(req,res) {
        res.render('login.ejs',{flash:req.flash('errLogin')})
    }

    static loginUserPost(req,res) {
        Model.User.findOne({where: {username: req.body.username}})
            .then((user) => {
                if(!user) {
                    res.redirect('/user/login')
                    throw new Error(`username salah`)
                } else if (!bcrypt.compareSync(req.body.password,user.password)) {
                    res.redirect('/user/login')
                   throw new Error(`password salah`)
                } else {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        balance: user.balance,
                        isAdmin: user.isAdmin
                    }
                    console.log(req.session.user)
                    res.redirect('/user/dashboard')
                }
            })
            .catch((err) => {
                req.flash('errLogin',`${err.message}`)
            })
    }

    static dashboard(req,res) {
        Model.User.findOne({
            where: {
                username: req.session.user.username
            }
        })
            .then((dataUser) => {
                res.render('dashboard.ejs',{dataUser:dataUser,formatMoney:formatMoney})
            })
            .catch((err) => {
                res.send(err)
            })
    }
    
    static logout(req,res) {
        req.session.destroy()
        res.redirect('/');
    }

    static balancePage(req,res) {
       Model.User.findByPk(req.params.id)
        .then((dataUser) => {
            res.render('balancePage.ejs',{dataUser:dataUser,formatMoney:formatMoney})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static balancePagePost(req,res) {
        Model.User.increment(['balance'], {by:req.body.balance,where: {id:req.params.id}})
            .then((data) => {
                res.redirect(`/user/balance/${req.params.id}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addToCart(req,res) {
        let total = Model.ShoesUser.getTotalPrice(req,res)                
        let all = Model.ShoesUser.findAll({
            order: [
                ['id', 'ASC']
            ],
            include: [Shoe]
        })        
        let user = Model.User.findByPk(req.session.user.id)

        Promise.all([total, all, user])
        .then(values =>{
            res.render('addToCart.ejs', {
                data: values[1],
                total: values[0],
                formatMoney:formatMoney,
                flash: req.flash(),
                balance: values[2].dataValues.balance,
                id:req.session.user.id
            })
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static increaseQuantity(req,res){
        Model.Shoe.findByPk(req.params.ShoeId)
        .then((shoe)=>{
            return Model.ShoesUser.increment(['totalPrice'], {
                by: shoe.price,
                where: {
                    id: req.params.shoesUserId
                }
            })
        })
        .then(()=>{
            return Model.ShoesUser.increment(['quantity'], {
                by:1,
                where: {
                    id: req.params.shoesUserId
                }
            })
        })
        .then(data=>{
            UserController.addToCart(req,res)
        })
        .catch(err=>{
            res.send(err)
        })     
            
    }

    static decreaseQuantity(req,res){
        Model.Shoe.findByPk(req.params.ShoeId)
        .then((shoe)=>{
            return Model.ShoesUser.decrement(['totalPrice'], {
                by: shoe.price,
                where: {
                    id: req.params.shoesUserId
                }
            })
        })
        .then(()=>{
            return Model.ShoesUser.decrement(['quantity'], {
                by:1,
                where: {
                    id: req.params.shoesUserId
                }
            })
        })
        .then(data=>{
            UserController.addToCart(req,res)
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static delete(req,res){
        Model.ShoesUser.destroy({
            where: {
                id: req.params.shoesUserId
            }
        })
        .then(() => {
            UserController.addToCart(req,res)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static clear(req,res){
        let total = Model.ShoesUser.getTotalPrice()
        let user = Model.User.findByPk(req.session.user.id)
        Promise.all([total,user])
        .then(values=>{
            const total = values[0]
            const user = values[1]
            if(total > user.dataValues.balance){
                req.flash('info', 'Not Enough Balance!')
                res.redirect('/user/cart')
            }else{
                Model.User.decrement(['balance'],{
                    by: total,
                    where:{
                        id: req.session.user.id
                    }
                })
                .then(()=>{
                    return Model.ShoesUser.destroy({
                        where:{
                            UserId : req.session.user.id
                        }
                    })
                })
                .then(() => {
                    UserController.addToCart(req,res)
                })
                .catch(err => {
                    res.send(err)
                })  
            }            
        })
        .catch(err=>{
            res.send(err)
        })
              
    }

}

module.exports = UserController