/**
 * Модуль базы данных
 * @module models/init_database
 */
const logger = require('../../config/logger').appLogger;

/**
 * @description Заполнение базы (типы модели)
 * @param AccountTypeModel {Object}
 * @returns {Promise}
 */
module.exports = async function initAccountType(AccountTypeModel) {
  AccountTypeModel.bulkCreate([
    { type_name: 'cash' },
    { type_name: 'bank_card' },
    { type_name: 'savings_account' },
    // eslint-disable-next-line no-console
  ]).catch(() => { logger.info('AccountType have already been initialized'); });
};
