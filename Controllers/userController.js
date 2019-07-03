const Model = require('../models/index')
const sessionChecker = require('../middlewares/sessionChecker')

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
        
    }

}

module.exports = UserController