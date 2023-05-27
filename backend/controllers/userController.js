import { Express } from "express";
import User from "models/userModel"

const userController = {};

// create user
userController.createUser = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    
    if (!username || !password) return next(); // prob redirect or send error here

    const createdUser = await User.create({username, password});
    res.locals.user = createdUser;
    // maybe add jwt here or something
    return next()

  } catch(err) {

    next(err);

  }

}

export default userController;
