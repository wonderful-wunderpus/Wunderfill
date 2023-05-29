// import models from "./models/userModel.js"
import bcrypt from 'bcryptjs'
import { User, Resume } from './models/UserModel.js'

const userController = {};

// get user
userController.getUser = async (req, res, next) => {

  const { username } = req.body; 

  try {
    
    // if no user do something

    const userExists = await User.findOne({ username });
    const user = await User.findById(user._id)

    if (userExists) {
      
      res.locals.user = userExists;
      // maybe add jwt here or something
      return next()

    }

    res.status(400);
    return next({ Error: 'User does not exist' });

  } catch(err) {

    return next(err);

  }

}

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

userController.getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}
// module.exports = userController;
export default userController;
