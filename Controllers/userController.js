const Model = require('../models/index')

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

}

module.exports = UserController