const sessionChecker = (req, res, next) => {
    console.log(req.session);
    if (req.session.passport && req.session.passport.user) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

export default sessionChecker;