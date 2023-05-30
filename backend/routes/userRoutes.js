import express from 'express';
import userController from '../controllers/userController.js';
import cookieController from '../controllers/cookieController.js';

const router = express.Router();

// Login as default homepage
router.get('/', (req, res) => res.status(200));

// Store user to db
router.post('/signup', userController.createUser, cookieController.setCookie, (req, res) => res.status(201).json(res.locals.user));
// router.get('/signup', userController, (req, res) => res.status(200));

// Redirect to user info
router.post('/login', userController.verifyUser, cookieController.setCookie, (req, res) => res.sendStatus(201));

export default router;
