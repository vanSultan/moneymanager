const jwt = require('jsonwebtoken');
const { app: appConfig } = require('../config/config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    req.user = jwt.verify(token, appConfig.jwtSecret);
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' });
  }

  return next();
};
