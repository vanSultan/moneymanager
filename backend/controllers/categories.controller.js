const { models } = require('../models');
const logger = require('../config/logger').appLogger;

const { Category, CategoryUser } = models;

/**
 * @description Получение списка категорий доступных пользователю
 * @param userId {number} - id пользователя
 * @returns {Promise<Array<Model>>}
 * @throws Error
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


/**
 * @description Получение категории, созадание категории, если такой нет
 * @param categoryName {string} - имя категории
 * @param parentCategoryId {number} - id родительской категории
 * @returns {Promise<Array<Model, boolean>>}
 * @throws Error
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

/**
 * @description Создание новой пользовательской категории
 * @param categoryName {string} - имя категории
 * @param parentCategoryId {number} - id родительской категории
 * @param userId {number} - id пользователя
 * @returns {Promise<Array<Model, boolean>>}
 * @throws Error
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

/**
 * @description Получение категории пользователя
 * @param categoryId {number} - id категории
 * @param userId {number} - id пользователя
 * @returns {Promise<Model>}
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


/**
 * @description Обновление информации о категории
 * @param categoryId {number} - id категории
 * @param categoryInfo {Object} - информация о категории
 * @param userId {number} - id пользователя
 * @returns {Promise<any>}
 * @throws Error
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


/**
 * @param categoryId {number} - id категории
 * @param userId {number} - id пользователя
 * @throws Error
 * @returns {Promise<number>}
 */
async function deleteCategoryUser(categoryId, userId) {
  if (categoryId === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return CategoryUser.destroy({
    where: {
      user_id: userId,
      category_id: categoryId,
    },
  });
}

/**
 * @description Изменение видимости категории
 * @param categoryId {number} - id категории
 * @param userId {number} - id пользователя
 * @throws Error
 * @returns {Promise<Model>}
 */
async function changeVisibleCategoryUser(categoryId, userId) {
  if (categoryId === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return CategoryUser.findOne({
    attributes: ['hidden_flag'],
    where: {
      user_id: userId,
      category_id: categoryId,
    },
  }).then((category) => CategoryUser.update({
    hidden_flag: !category.hidden_flag,
  }, {
    where: {
      user_id: userId,
      category_id: categoryId,
    },
  }));
}


/**
 * @description олучение базовых категорий
 * @returns {Promise<Array<Model>>}
 */
async function getBaseCategories() {
  return Category.findAll({
    attributes: ['id', 'name'],
    where: {
      parent_category_id: null,
    },
  });
}

/**
 * @description  Добавление базовых категорий новому пользовтелю
 * @param userId {string} - id пользовател
 * @returns {Promise<Model>}
 */
async function initCategoriesToNewUser(userId) {
  if (userId === null) {
    throw new Error('Нулевые аргументы');
  }

  const intUserId = parseInt(userId, 10);

  return getBaseCategories()
    .then((baseCategories) => {
      const dataToInsert = [];
      baseCategories.forEach((baseCategory) => {
        dataToInsert.push({
          user_id: intUserId,
          category_id: baseCategory.id,
          hidden_flag: false,
        });
      });

      return CategoryUser.bulkCreate(dataToInsert, {
        validate: true,
        ignoreDuplicates: true,
      });
    });
}

module.exports = {
  getCategoriesUser,
  createCategoryUser,
  getCategoryUser,
  updateCategoryUser,
  deleteCategoryUser,
  changeVisibleCategoryUser,
  initCategoriesToNewUser,
};
