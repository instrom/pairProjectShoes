var sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/user/dashboard');
    } else {
        next();
    }    
};

module.exports = sessionChecker