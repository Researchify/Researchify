/**
 * Exports a Nodemailer Transport that can be used to send emails.
 */
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const { createTransport } = require('nodemailer');
require('dotenv').config();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USERNAME,
    clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
    clientSecret: process.env.GMAL_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
  },
});

transporter.use('compile', hbs({
  viewEngine: {
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, './views/'),
}));

module.exports = transporter;
