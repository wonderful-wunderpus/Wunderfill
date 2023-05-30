import Session from '../models/sessionModel';
const sessionController = {};

// check if user is logged in:
sessionController.isLoggedIn = (req, res, next) => {
    if (!req.cookies.SSID) return res.redirect('/login');
    Session.findOne({cookieId: res.locals.user.id}, (err) => {
        if (err) return res.redirect('/login');
    });
    return (next);
}

// create Session
sessionController.startSession = async (req, res, next) => {
    try {
        const newSession = await Session.create({cookieID: res.locals.user.id});
        res.locals.session = newSession;
        return next();
    }
    catch (e) {
        return next({error: e})
    }
};

export default sessionController;