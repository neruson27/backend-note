import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true
  },
  password: String
})

const User = mongoose.model('User', UserSchema);

export default User;