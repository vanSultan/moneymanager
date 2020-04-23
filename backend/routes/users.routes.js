const { Router } = require('express');
const sequelize = require('sequelize');

const auth = require('../middleware/auth.middleware');
const { getUserProfile } = require('../controllers/users.controller');
const logger = require('../config/logger').appLogger;

const router = Router(sequelize);

// /users/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет получить профиль`);

    return getUserProfile(userId)
      .then((model) => {
        if (model === null) {
          return res.status(204).json({ message: 'Информация отсутствует' });
        }
        return res.status(200).json(model);
      });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
