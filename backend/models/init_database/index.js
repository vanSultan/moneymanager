/**
 * Модуль базы данных
 * @module models/init_database
 */
const initRole = require('./role.init');
const initAccountType = require('./account_type.init');
const initCategory = require('./category.init');

/**
 * @description Заполнение базы (вызов заполнения)
 * @param models {Object}
 */
module.exports = function initDatabase(models) {
  initRole(models.Role);
  initAccountType(models.AccountType);
  initCategory(models.Category);
};
