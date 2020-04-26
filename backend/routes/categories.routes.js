const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  getCategoriesUser,
  createCategoryUser,
  getCategoryUser,
  updateCategoryUser,
} = require('../controllers/categories.controller');

const router = Router(sequelize);

// /categories
router.get('/', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет получить категории`);

    return getCategoriesUser(userId)
      .then((categoriesList) => {
        const list = [];
        for (let i = 0; i < categoriesList.length; i += 1) {
          list.push({
            id: categoriesList[i].id,
            name: categoriesList[i].name,
            status: !categoriesList[i].category_users[0].hidden_flag,
            parentCategoryId: categoriesList[i].parent_category_id,
          });
        }
        return res.status(200).json(list);
      })
      .catch((e) => {
        logger.error(e.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
      });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

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

// /categories/{categoryId}
router.get('/:categoryId', auth, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет получить категорию`);

    return getCategoryUser(categoryId, userId)
      .then((category) => res.status(200).json({
        id: category.id,
        name: category.name,
        status: !category.category_users[0].hidden_flag,
        parentCategoryId: category.parent_category_id,
      }))
      .catch((e) => {
        logger.error(e.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
      });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// /categories/{categoryId}
router.put('/:categoryId', auth, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryInfo = req.body;
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет обновить информацию о категории`);

    return updateCategoryUser(categoryId, categoryInfo, userId)
      .then(() => res.status(200).json({ message: 'Категория обновлена' }))
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
