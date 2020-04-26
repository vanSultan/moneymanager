const { models } = require('../models');
const logger = require('../config/logger').appLogger;

const { Category, CategoryUser } = models;

/*
  Получение списка категорий доступных пользователю
 */
async function getCategoriesUser(userId) {
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
  Возвращает Promise<Array<model, created>>
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

/*
  Получение категории пользователя
  Возвращает Promise<Model>
 */
async function getCategoryUser(categoryId, userId) {
  if (categoryId === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Category.findByPk(parseInt(categoryId, 10), {
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
  Обновление информации о категории
  Возвращает Promise<Model>
 */
async function updateCategoryUser(categoryId, categoryInfo, userId) {
  if (categoryId === null || categoryInfo === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Category.update({
    name: categoryInfo.name,
    parent_category_id: categoryInfo.parentCategoryId,
  }, {
    where: {
      id: categoryId,
    },
    include: [{
      model: CategoryUser,
      where: {
        user_id: userId,
      },
    }],
  }).then(() => CategoryUser.update(
    { hidden_flag: !categoryInfo.status },
    {
      where: {
        user_id: userId,
        category_id: categoryId,
      },
    },
  ));
}

module.exports = {
  getCategoriesUser,
  createCategoryUser,
  getCategoryUser,
  updateCategoryUser,
};
