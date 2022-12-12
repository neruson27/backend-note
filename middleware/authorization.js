import Mongoose from 'mongoose';
import { User } from '../models';
import { decodeJWT } from '../utils/jwt';

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!req.path.includes('/login') && !req.path.includes('/signup')) {
    if (!token) {
      return res.status(403).send({ message: 'You need a token' })
    }
    try {
      const payload = decodeJWT(token);
      const userExist = await User.findOne({_id: Mongoose.Types.ObjectId(payload.id)});

      if (!userExist) return res.status(403).send({ message: 'User doesn\`t  exist' })

      req.params.user = payload.user
      req.params.userId = payload.id

    } catch (err) {
      console.error(err)
      return res.status(500).send({ message: 'Token invalid' })
    }
  }

  next()
}

export default authorization;