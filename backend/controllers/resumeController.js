import { User, Resume } from './models/userModel.js';

const resumeController = {};

// get resume
resumeController.getResume = async (req, res, next) => {

  const { userId } = req.body; //req.query or req.body? user userId instead of username

  try {

    // find user using username from req.body, then resume using object id from user
    const foundUser = await User.findById({ _id: userId }); // change to find by id
    // const foundResume = await Resume.findById({ resumeId });

    // if user has a resume, set res.locals to resume and pass to next
    if (foundUser.resume) {

      res.locals.resume = foundUser.resume;
      return next();

    } else {
      // send an error. not sure if need to send status and if it should go on to next
      res.status(500);
      return next({ Error: 'No resume found' });

    }

  } catch(err) {
    // add 400 error
    res.status(400);
    return next({ Error: 'Error occurred while getting resume' });

  }

};

// create resume
resumeController.createResume = async (req, res, next) => {

  const { userId, email } = req.body;

  try {

    // if (!fields) return next(); // prob redirect or send error here

    const foundUser = await User.findById({ userId }); //findbyid

    if (!foundUser.resume) {
      // created new resume
      const createdResume = await Resume.create({ email });
      // find user and set its resume to the id of newly created resume
      await User.findOneAndUpdate({ _id: userId }, { $set: { resume: createdResume._id }});

      res.locals.resume = createdResume;
      return next();

    }

    res.status(500);
    return next({ Error: 'Resume already exists for this user'});

  } catch(err) {

    res.status(400);
    return next({ Error: 'Error occcurred while creating resume' });

  }

};

// update resume
resumeController.updateResume = async (req, res, next) => {

  const { username, fields } = req.body;

  try {

    // if no username do something
    if (!username) return next(); // prob redirect or send error here

    const foundUser = await User.findOne({ username });

    if (foundUser.resume) {

      const foundResume = await Resume.findOneAndUpdate({ _id: foundUser.resume }, { $set: { fields }}); //not sure if need to use id or _id

      res.locals.resume = foundResume;
      return next();

    } else {
      // send an error. not sure if need to send status and if it should go on to next
      res.status(500);
      return next({ Error: 'No resume found' });

    }

  } catch(err) {

    next(err);

  }

};

/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
/*************************** WORK IN PROGRESS ******************************* */
resumeController.setSingleField = async (req, res, next) => {

  resume.set(`fields.${fieldName}`, fieldValue);
  await resume.save();
};

resumeController.getSingleField = async (req, res, next) => {
  const { fieldName } = req.body;

  const resume = await Resume.findOne(fieldName);

  const fieldValue = resume.fields[fieldName];
};
/*************************** WORK IN PROGRESS ******************************* */
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

// delete resume
resumeController.deleteResume = async (req, res, next) => {

  const { username } = req.body;

  try {

    // find user, find resume and delete, update user's resume to null
    const foundUser = await User.findOne({ username });
    if (foundUser.resume) {

      const foundResume = await Resume.findOneAndDelete({ _id: foundUser.resume });
      await User.findOneAndUpdate({ username }, { $set: { resume: undefined }});
      return res.status(200).json({ Message: 'User resume successfully deleted'});

    } else {
      // send an error. not sure if need to send status and if it should go on to next
      res.status(500);
      return next({ Error: 'No resume found' });

    }

  } catch(err) {

    next({ Error: 'Error occurred when finding resume'});

  }

};

export default resumeController;
