import bcrypt from 'bcryptjs';

/**
 * Function to encrypt one password
 * 
 * @param {*} password String
 * @returns encrypted password
 */
async function encryptPassword(password) {
  return bcrypt.hash(password, 8)
}

/**
 * Function to validate one password
 * 
 * @param {*} password String
 * @param {*} hash String
 * @returns boolean
 */
async function validatePassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export {
  encryptPassword,
  validatePassword
}