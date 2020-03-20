const { Router } = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const { createUser, getTokenOfUser } = require('../controllers/auth.controller');
const logger = require('../config/logger').appLogger;

const router = Router(sequelize);

// /auth/register
router.post(
  '/register',
  [
    check('login', 'Введите логин').exists(),
    check('password', 'Введите пароль').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }

      return await createUser(req, res);
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);

// /auth/login
router.post(
  '/login',
  [
    check('login', 'Введите логин').exists(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        });
      }

      return await getTokenOfUser(req, res);
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({ message: 'Что-то не так, попробуйте снова' });
    }
  },
);

module.exports = router;
