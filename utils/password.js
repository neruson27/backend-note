import bcrypt from 'bcryptjs';

async function encryptPassword(password) {
  return bcrypt.hash(password, 8)
}

async function validatePassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export {
  encryptPassword,
  validatePassword
}