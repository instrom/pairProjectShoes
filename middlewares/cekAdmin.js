module.exports = function(req,res,next){
    if(req.session.user.isAdmin){
        next()
    } else {
        req.flash('info','You have to be an admin to do that')
        res.redirect('/shoes')
    }
}