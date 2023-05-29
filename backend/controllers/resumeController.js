import { User, Resume } from "./models/userModel.js"

const resumeController = {};

// get resume
resumeController.getResume = async (req, res, next) => {

  const { userId } = req.body; //req.query or req.body? user userId instead of username

  try {

    // find user using username from req.body, then resume using object id from user
    const foundUser = await User.findOne({ username }); // change to find by id
    // const foundResume = await Resume.findOne({ _id: foundUser.resume });

    // if user has a resume, set res.locals to resume and pass to next
    if (foundResume) {

      res.locals.resume = foundResume;
      return next()

    } else {
      // send an error. not sure if need to send status and if it should go on to next
      res.status(500);
      return next({ Error: 'No resume found' });

    }

  } catch(err) {
    // add 400 error
    return next(err);

  }

}

// create resume - dont need, just update
resumeController.createResume = async (req, res, next) => {

  const { username, fields } = req.body;

  try {
    
    // if (!fields) return next(); // prob redirect or send error here

    const foundUser = await User.findOne({ username }); //findbyid

    if (!foundUser.resume) {
      // created new resume
      const createdResume = await Resume.create({ fields });
      // find user and set its resume to the id of newly created resume
      await User.findOneAndUpdate({ username }, { $set: { resume: createdResume._id }});      
  
      res.locals.resume = createdResume;
      return next()

    } 

    res.status(500);
    return next({ Error: 'Resume already exists for this user'});

  } catch(err) {

    return next(err);

  }

}

// update resume
resumeController.updateResume = async (req, res, next) => {

  const { username, fields } = req.body;

  try {
    
    // if no username do something
    if (!username) return next(); // prob redirect or send error here

    const foundUser = await User.findOne({ username });

    if (foundUser.resume) {

      await Resume.findOneAndUpdate({ _id: foundUser.resume }, { $set: { fields }}); //not sure if need to use id or _id 
      
      res.locals.resume = foundResume;
      return next()

    } else {
      // send an error. not sure if need to send status and if it should go on to next
      res.status(500);
      return next({ Error: 'No resume found' });

    }

  } catch(err) {

    next(err);

  }

}

// delete resume
resumeController.deleteResume = async (req, res, next) => {

  const { username } = req.body;

  try {
    
    // if no username do something
    if (!username) return next(); // prob redirect or send error here

    // find user, find resume and delete, update user's resume to null
    const foundUser = await User.findOne({ username });
    if (foundUser.resume) {

      const foundResume = await Resume.findOneAndDelete({ _id: foundUser.resume });    
      await User.findOneAndUpdate({ username }, { $set: { resume: null }});
      return next()

    } else {
      // send an error. not sure if need to send status and if it should go on to next
      res.status(500);
      return next({ Error: 'No resume found' });

    }

  } catch(err) {

    next(err);

  }

}

export default resumeController;
