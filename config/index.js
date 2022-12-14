import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongoUrl: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/noteApp', // String connection of mongodb
  secret: process.env.SECRET || '' // Secret for jwt decode 
}

export default config;