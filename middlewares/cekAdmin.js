module.exports = function(req,res,next){
    if(req.session.user.isAdmin){
        next()
    } else {
        throw new Error('you have to be an admin to register shoes')
    }
}