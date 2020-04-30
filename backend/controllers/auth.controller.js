const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { app: appConfig } = require('../config/config');
const { models } = require('../models');
const { initCategoriesToNewUser } = require('./categories.controller');
const logger = require('../config/logger').appLogger;

const { User, Role } = models;

async function createUser(req, res) {
  const { login, password } = req.body;

  const candidate = await User.findOne({ where: { login } });

  if (candidate) {
    return res.status(400).json({ message: 'Такой пользователь уже существует' });
  }

  const userRole = await Role.findOne({ where: { name: 'user' } });

  const hashedPassword = await bcrypt.hash(password, 12);

  return User.create({
    login,
    password: hashedPassword,
    role_id: userRole.id,
  }).then((user) => initCategoriesToNewUser(user.id)
    .then(() => res.status(201).json({ message: 'Пользователь создан' })))
    .catch((e) => {
      logger.error(e.message);
      res.status(500).json({ message: 'Ошибка сервера' });
    });
}

async function getTokenOfUser(req, res) {
  const { login, password } = req.body;

  const user = await User.findOne({ where: { login } });

  if (!user) {
    return res.status(400).json({ message: 'Пользователь не найден' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
  }

  const token = jwt.sign(
    { userId: user.id },
    appConfig.jwtSecret,
    { expiresIn: '1h' },
  );

  return res.status(200).json({ token });
}

async function destroyTokenOfUser(req, res) {
  // Реализуем на стороне клиента
  return res.status(200).json({ message: 'Токен успешно сброшен' });
}

module.exports = {
  createUser,
  getTokenOfUser,
  destroyTokenOfUser,
};
