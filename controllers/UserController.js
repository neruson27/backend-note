import JWT from 'jwt-simple';
import { User } from '../models';
import config from '../config';
import { encryptPassword, validatePassword } from '../utils/password';

/**
 * Controller of User API
 */

/**
 * Log in the user
 * POST /user/login
 * 
 * @param user string required
 * @param password string required
 * @returns status 200 with token object or status 400 if there some error
 */
async function login(req, res) {
  const { user, password } = req.body;

  const existUser = await User.findOne({user});

  if (!existUser) {
    return res.status(400).send({message: "USER NOT EXIST"});
  }

  const validPassword = await validatePassword(password, existUser.password);

  if(!validPassword) {
    return res.status(400).send({message: "PASSWORD INVALID"});
  }

  const token = JWT.encode({
    id: existUser._id,
    user: existUser.user,
  }, config.secret)

  return res.status(200).send({token})
}

/**
 * Register the user
 * POST /user/signup
 * 
 * @param user string required
 * @param password string required
 * @returns status 200 with token object or status 400 if there some error
 */
async function createUser(req, res) {
  const { user, password } = req.body;

  const existUser = await User.findOne({user});

  if (existUser) {
    return res.status(400).send({message: "USER EXIST"});
  }

  const createdUser = await User.create({
    user,
    password: await encryptPassword(password)
  })

  const jwt = JWT.encode({
    id: createdUser._id,
    user: createdUser.user
  }, config.secret)

  return res.status(200).send({token: jwt})
}

export default {
  login,
  createUser
}