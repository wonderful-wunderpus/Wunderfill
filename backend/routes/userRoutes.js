import express from 'express';
import userController from '../controllers/userController.js';
import cookieController from '../controllers/cookieController.js';
import sessionController from '../controllers/sessionController.js'
import resumeController from '../controllers/resumeController.js';


const router = express.Router();

// Login as default homepage
router.get('/', (req, res) => res.status(200));

// Store user to db
router.post('/signup', userController.createUser, cookieController.setCookie, sessionController.startSession, (req, res) => res.status(201).json(res.locals.user));
// router.get('/signup', userController, (req, res) => res.status(200));

// Redirect to user info
router.post('/login', userController.verifyUser, cookieController.setCookie, sessionController.startSession, (req, res) => res.sendStatus(201));

router.route('/resume')
  .get(resumeController.getResume, (res) => res.status(201).json(res.locals.resume)) //dont know if this is needed
  .post(resumeController.createResume, (res) => res.status(201).json(res.locals.resume))
  .delete(resumeController.deleteResume);

export default router;
