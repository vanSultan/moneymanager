/**
 * Модуль базы данных
 * @module models/init_database
 */
const logger = require('../../config/logger').appLogger;

/**
 * @description Заполнение базы (категории)
 * @param CategoryModel {Object}
 */
module.exports = function initCategory(CategoryModel) {
  CategoryModel.bulkCreate([
    { name: 'Прочее' },
    { name: 'Еда и напитки' },
    { name: 'Покупки' },
    { name: 'Жильё' },
    { name: 'Транспорт' },
    { name: 'Жизнь и развлечения' },
    { name: 'Связь, ПК' },
    { name: 'Финансовые расходы' },
    { name: 'Доход' },
    // eslint-disable-next-line no-console
  ]).catch(() => { logger.info('Category have already been initialized'); });
};
