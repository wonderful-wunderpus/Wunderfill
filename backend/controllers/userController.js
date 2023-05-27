
import User from "./models/userModel.js"
const bcrypt = require('bcryptjs');

const userController = {};

// create user
userController.createUser = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    
    // if no user or pass do something
    if (!username || !password) return next(); // prob redirect or send error here

    const userExists = await User.findOne({ username });

    if (!userExists) {
      
      const createdUser = await User.create({ username, password });
      res.locals.user = createdUser;
      // maybe add jwt here or something
      return next()

    }

    res.status(400);
    return next({ Error: 'User already exists' });

  } catch(err) {

    return next(err);

  }

}

// login
userController.verifyUser = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    
    // if no user or pass do something
    if (!username || !password) return next(); // prob redirect or send error here

    const foundUser = await User.findOne({ username });
    const compPass = await bcrypt.compare(password, foundUser.password);
    // if pass doesn't match send to signup
    if (!compPass) {

      return res.redirect('/signup');

    }
    
    res.locals.user = foundUser;
    // maybe add jwt here or something
    return next()

  } catch(err) {

    next(err);

  }

}

export default userController;
