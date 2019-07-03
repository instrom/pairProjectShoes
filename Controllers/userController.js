const Model = require('../models/index')
const sessionChecker = require('../middlewares/sessionChecker')
const bcrypt = require('bcrypt')

class UserController {
    static createUser(req,res) {
        res.render('userRegistration.ejs',{flash:req.flash('errEmail')})
    }

    static createUserPost(req,res) {
        Model.User.create({
            username: req.body.username,
            email:req.body.email,
            password:req.body.password
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
        res.render('login.ejs')
    }

    static loginUserPost(req,res) {
        Model.User.findOne({where: {username: req.body.username}})
            .then((user) => {
                if(!user) {
                    console.log('username tidak ada');
                    res.redirect('/user/login')
                } else if (!bcrypt.compareSync(req.body.password,user.password)) {
                    console.log('password salah')
                    res.redirect('/user/login')
                } else {
                    req.session.user = user.dataValues
                    console.log(req.session.user)
                    res.redirect('/user/dashboard')
                }
            })
    }

    static dashboard(req,res) {
        if(req.session.user) {
            res.render('dashboard.ejs')
        } else {
            res.redirect('/login')
        }
    }

}

module.exports = UserController