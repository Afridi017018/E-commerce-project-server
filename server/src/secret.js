require('dotenv').config();

const port = process.env.PORT || 5001;
const mongoUrl = process.env.MONGODB_URL;
const defaultImage = process.env.DEFAULT_USER_IMAGE || 'public/images/users/default.png';

module.exports = {port, mongoUrl, defaultImage};