const { models } = require('../models');
const logger = require('../config/logger').appLogger;

const { Account, AccountType } = models;

async function createAccount(accountInfo, userId) {
  logger.info(`accountInfo ${accountInfo}`);
  logger.info(`userId ${userId}`);
  logger.info('createAccount');
  if (accountInfo === undefined || userId === undefined) return undefined;
  logger.info('createAccount');

  logger.info(`accountInfo ${accountInfo}`);
  logger.info(`userId ${userId}`);

  const accountType = await AccountType.findOne({
    attributes: ['id'],
    where: {
      type_name: accountInfo.type,
    },
  });

  logger.info(`accountType ${accountType}`);

  if (accountType != null) {
    return Account.create({
      user_id: userId,
      name: accountInfo.name,
      type_id: accountType.dataValues.id,
      balance: accountInfo.balance,
    });
  }

  return undefined;
}

module.exports = {
  createAccount,
};
