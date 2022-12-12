import express from "express";
import UserController from '../controllers/UserController';

const user = express.Router();

// Login
user.post('/login', UserController.login);
// Register
user.post('/signup', UserController.createUser);

export default user;