require('dotenv').config();

const port = process.env.PORT || 5001;
const mongoUrl = process.env.MONGODB_URL;
const defaultImage = process.env.DEFAULT_USER_IMAGE || 'public/images/users/default.png';
const jwtKey = process.env.JWT_KEY;
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientURL = process.env.CLIENT_URL;

module.exports = {port, mongoUrl, defaultImage, jwtKey, smtpUsername, smtpPassword, clientURL};