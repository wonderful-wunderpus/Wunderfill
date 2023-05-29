import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Login as default homepage
router.get('/', (req, res) => res.status(200));

// Store user to db
// router.get('/signup', userController, (req, res) => res.status(200)); 
router.post('/signup', userController.createUser, (req, res) => res.status(201).json(res.locals.user));

// Redirect to user info
router.post('/login', userController.verifyUser, (req, res) => res.status(201));


//get & post for resume data

export default router;