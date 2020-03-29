const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
const entitiesRouter = require('./entities.routes');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.user('/api/externalEntities/', entitiesRouter);
};
