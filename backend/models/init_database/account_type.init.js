const logger = require('../../config/logger').appLogger;

module.exports = async function initAccountType(AccountTypeModel) {
  AccountTypeModel.bulkCreate([
    { type_name: 'cash' },
    { type_name: 'bank_card' },
    { type_name: 'savings_account' },
    // eslint-disable-next-line no-console
  ]).catch(() => { logger.info('AccountType have already been initialized'); });
};
