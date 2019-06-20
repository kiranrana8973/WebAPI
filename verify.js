exports.user = (req, res, next) => {
    if (!req.user) {
        let err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
    } else {
        next();
    }
};

module.exports.admin = (req, res, next) => {
    if (req.user.admin === true) {
        next();
    } else {
        let err = new Error('You are not admin!');
        err.status = 403;
        return next(err);
    }
}