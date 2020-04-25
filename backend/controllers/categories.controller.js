const { models } = require('../models');
const logger = require('../config/logger').appLogger;

const { Category, CategoryUser } = models;

/*
  Получение списка категорий доступных пользователю
 */
async function getCategoryUser(userId) {
  if (userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Category.findAll({
    include: [{
      attributes: ['hidden_flag'],
      model: CategoryUser,
      where: {
        user_id: userId,
      },
    }],
  });
}

/*
  Получение категории, созадание категории, если такой нет
  Возвращает Promise<model>
 */
async function getOrCreateCategory(categoryName, parentCategoryId) {
  if (categoryName === null || parentCategoryId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Category.findOrCreate({
    where: {
      name: categoryName,
      parent_category_id: parentCategoryId,
    },
  });
}

/*
  Создание новой пользовательской категории
  Возвращает Promise<Model>
 */
async function createCategoryUser(categoryName, parentCategoryId, userId) {
  if (categoryName === null || parentCategoryId === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return getOrCreateCategory(categoryName, parentCategoryId)
    .then(
      ([category]) => CategoryUser.create({
        user_id: userId,
        category_id: category.id,
        hidden_flag: false,
      }),
    ).catch(
      (e) => {
        logger.error(e.message);
        throw e;
      },
    );
}

module.exports = {
  getCategoryUser,
  createCategoryUser,
};
