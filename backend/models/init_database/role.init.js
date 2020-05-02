/**
 * Модуль базы данных
 * @module models/init_database
 */
const logger = require('../../config/logger').appLogger;

/**
 * @description Заполнение базы (роли пользователей)
 * @param RoleModel {Object}
 */
module.exports = function initRole(RoleModel) {
  RoleModel.bulkCreate([
    { name: 'user' },
    { name: 'moderator' },
  ]).catch(() => { logger.info('Role have already been initialized'); });
};
