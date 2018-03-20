module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    console.log('Redirecting to /');
    return res.redirect('/#/');
};