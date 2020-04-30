const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
const entitiesRouter = require('./entities.routes');
const accountsRouter = require('./accounts.routes');
const categoriesRouter = require('./categories.routes');
const operationsRouter = require('./operations.routes');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/externalEntities/', entitiesRouter);
  app.use('/api/accounts', accountsRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/operations', operationsRouter);
};
