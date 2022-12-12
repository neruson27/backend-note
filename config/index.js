import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongoUrl: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/noteApp',
  secret: process.env.SECRET || ''
}

export default config;