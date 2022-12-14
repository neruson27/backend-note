import jwt from 'jwt-simple';
import config from '../config';

/**
 * Function to decode jwt
 * @param {*} token String
 * @returns payload of the jwt
 */
function decodeJWT(token) {
  return jwt.decode(token.replace('Bearer ', ''), config.secret)
}

export {
  decodeJWT
}