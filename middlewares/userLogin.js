module.exports = function checkLogin(req,res,next) {
    if(req.session.user) {
        next()
    } else {
        res.redirect('/user/login')
    }
}