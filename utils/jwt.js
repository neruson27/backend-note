import jwt from 'jwt-simple';
import config from '../config';

function decodeJWT(token) {
  return jwt.decode(token.replace('Bearer ', ''), config.secret)
}

export {
  decodeJWT
}