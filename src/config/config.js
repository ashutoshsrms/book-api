require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = Number(process.env.PORT) || 3000;
const BASE_API = process.env.BASE_API || '';

module.exports = {
  MONGODB_URI,
  PORT,
  BASE_API,
  
};