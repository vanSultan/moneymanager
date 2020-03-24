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

async function getAccountTypes() {
  return AccountType.findAll({
    attributes: ['type_name'],
  });
}

async function getAccountById(accountId, userId) {
  if (accountId === undefined) return undefined;

  const accountInfo = await Account.findOne({
    include: [{
      model: AccountType,
    }],
    where: {
      id: accountId,
      user_id: userId,
    },
    attributes: ['id', 'name', 'balance'],
  });

  if (accountInfo !== undefined) {
    return {
      id: accountInfo.id,
      name: accountInfo.name,
      balance: accountInfo.balance,
      type_name: accountInfo.account_type.type_name,
    };
  }

  return undefined;
}

async function updateAccount(accountId, accountInfo, userId) {
  if (accountId === undefined || accountInfo === undefined
          || userId === undefined) return undefined;

  if (await getAccountById(accountId, userId) !== undefined) {
    const accountType = await AccountType.findOne({
      attributes: ['id'],
      where: {
        type_name: accountInfo.type,
      },
    });

    await Account.update(
      {
        name: accountInfo.name,
        balance: accountInfo.balance,
        type_id: accountType.id,
      },
      {
        where: {
          user_id: userId,
          id: accountId,
        },
      },
    );

    return 0;
  }

  return undefined;
}

async function deleteAccount(accountId, userId) {
  if (accountId === undefined || userId === undefined) return undefined;

  if (await getAccountById(accountId, userId) !== undefined) {
    await Account.destroy({
      where: {
        user_id: userId,
        id: accountId,
      },
    });
    return 0;
  }

  return undefined;
}

module.exports = {
  createAccount,
  getUserAccounts,
  getAccountTypes,
  getAccountById,
  updateAccount,
  deleteAccount,
};
