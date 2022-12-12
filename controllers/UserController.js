import JWT from 'jwt-simple';
import { User } from '../models';
import config from '../config';
import { encryptPassword, validatePassword } from '../utils/password';

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

async function createUser(req, res) {
  const { user, password } = req.body;

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