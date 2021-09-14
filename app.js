require('dotenv/config');
require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const projectName = 'iron-movies_';
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.siteTitle = `${capitalized(projectName)}`;

require('./config/session.config')(app)

require('./routes')(app);

require('./error-handling')(app);

module.exports = app;