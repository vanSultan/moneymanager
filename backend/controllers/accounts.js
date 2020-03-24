const { models } = require('../models');

const { Account, AccountType } = models;

async function createAccount(accountInfo, userId) {
  if (accountInfo === undefined || userId === undefined) return undefined;

  const accountType = await AccountType.findOne({
    attributes: ['id'],
    where: {
      type_name: accountInfo.type,
    },
  });

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

async function getUserAccounts(userId) {
  if (userId === undefined) return undefined;

  const accountList = await Account.findAll({
    include: [{
      model: AccountType,
    }],
    where: {
      user_id: userId,
    },
    attributes: ['id', 'name', 'balance'],
  });
  const resultList = [];
  for (let i = 0; i < accountList.length; i += 1) {
    resultList.push({
      id: accountList[i].id,
      name: accountList[i].name,
      balance: accountList[i].balance,
      type_name: accountList[i].account_type.type_name,
    });
  }

  return resultList;
}

module.exports = {
  createAccount,
  getUserAccounts,
};
