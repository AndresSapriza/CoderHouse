export function sessionChecker(req, res, next) {
    if (req.session.passport && req.session.passport.user) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

export function sessionCheckerStay(req, res, next) {
    if (!req.session.passport || !req.session.passport.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

// export default sessionChecker, sessionCheckerStay;