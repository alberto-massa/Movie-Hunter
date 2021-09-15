module.exports = (app) => {
  app.use('/', require('./base.routes.js'));
  app.use('/user', require('./user.routes.js'));
  app.use('/', require('./auth.routes.js'));
  app.use('/movies', require('./movies.routes.js'));
  app.use('/admin', require('./admin.routes.js'));
  app.use('/mod', require('./mod.routes.js'));
};
