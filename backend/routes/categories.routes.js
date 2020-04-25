const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  createCategoryUser,
} = require('../controllers/categories.controller');

const router = Router(sequelize);

// /categories
router.post('/', auth, async (req, res) => {
  try {
    const categoryName = req.body.name;
    const { parentCategoryId } = req.body;
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет добавить категорию`);

    return createCategoryUser(categoryName, parentCategoryId, userId)
      .then((model) => res.status(201).json({ id: model.category_id }))
      .catch((e) => {
        logger.error(e.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
      });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
