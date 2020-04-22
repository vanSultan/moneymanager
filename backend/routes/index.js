const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
const entitiesRouter = require('./entities.routes');
const accountsRouter = require('./accounts.routes');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/externalEntities/', entitiesRouter);
  app.use('/api/accounts', accountsRouter);
};
