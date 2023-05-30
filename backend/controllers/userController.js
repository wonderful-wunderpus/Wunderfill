// import models from "./models/userModel.js"
import bcrypt from 'bcryptjs';
import models from '../models/userModel.js';

const userController = {};

// get user
userController.getUser = async (req, res, next) => {

  const { userId } = req.body;

  try {

    // if no user do something

    const userExists = await models.User.findById({ userId });
    // const user = await User.findById(user._id)

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
userController.createUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.status(400).json({ error: 'Both username and password are required.' });
  models.User.findOne({ username })
    .then((existingUser) => {
      if (existingUser) return res.status(409).json({ error: 'User with this username already exists.' });
      return models.User.create({ username, password })
        .then((savedUser) => res.status(201).json({ message: 'User created successfully.', user: savedUser }))
        .catch(() => res.status(500).json({ error: 'An error occurred while saving the user.' }));
    })
    .catch(() => res.status(500).json({ error: 'An error occurred while checking for existing user.' }));
};

// login
userController.verifyUser = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Both username and password are required.' });
  models.User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'User not found.' });
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            return res.status(200).json({ message: 'User verified successfully.' });
          }
          return res.status(401).json({ error: 'Invalid password.' });
        })
        .catch(() => res.status(500).json({ error: 'An error occurred while verifying the user.' }));
    })
    .catch(() => res.status(500).json({ error: 'An error occurred while finding the user.' }));
};

// userController.getAllUsers = async (req, res) => {
//   const users = await User.find({})
//   res.json(users)
// }
// module.exports = userController;
export default userController;
