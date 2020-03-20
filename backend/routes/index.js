const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
};
