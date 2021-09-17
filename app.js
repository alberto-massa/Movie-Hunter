require('dotenv/config');
require('./db');

const express = require('express');

const hbs = require('hbs');

const app = express();

require('./config')(app);

const { capitalized } = require("./utils");
app.locals.siteTitle = `${capitalized('movie hunter')}`;

app.locals.isLogged = ""
app.locals.isAdmin = "";
app.locals.isMod = "";

app.locals.siteUsername = "";
app.locals.userAvatar = "";

require('./config/session.config')(app)

require('./routes')(app);

require('./error-handling')(app);

module.exports = app;