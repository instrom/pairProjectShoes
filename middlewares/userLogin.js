module.exports = function checkLogin(req,res) {
    if(req.session.user) {
        next()
    } else {
        res.redirect('/user/login')
    }
}