const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('SSID', res.locals.user.id, {
        nextAge: 6000,
        httpOnly: true,
    })
    return next();
}

module.exports = cookieController;