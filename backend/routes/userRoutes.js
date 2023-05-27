const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController, (req, res) => res.status(200)); //login as default homepage

router.post('/login', userController.verifyUser, (req, res) => res.status(201)); // redirect to user info

router.get('/signup', userController, (req, res) => res.status(200)); 

router.post('/signup', userController.createUser, (req, res) => res.status(201).json(res.locals.us)); //store user to db

//get & post for resume data

module.exports = router;