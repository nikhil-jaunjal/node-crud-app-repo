const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkAuth = require('../middelware/check-auth');

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.delete('/:id', checkAuth, UserController.deleteUser);

router.get('/', UserController.getAllUsers);

module.exports = router;