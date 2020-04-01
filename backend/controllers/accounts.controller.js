const { models } = require('../models');

const { Account, AccountType } = models;

/*
  Создание нового Счета
  Возвращает Promise<Model>
*/
async function createAccount(accountInfo, userId) {
  if (accountInfo === undefined || userId === undefined) {
    throw new Error('Нулевые аргументы');
  }

  return AccountType.findOne({
    attributes: ['id'],
    where: {
      type_name: accountInfo.type,
    },
  })
    .then((accountType) => Account.create({
      user_id: userId,
      name: accountInfo.name,
      type_id: accountType.get('id'),
      balance: accountInfo.balance,
    }))
    .catch((err) => {
      throw err;
    });
}

/*
  Получение всех пользовательских счетов
  Возвращает Promise<Array<Model>>
*/
async function getUserAccounts(userId) {
  if (userId === undefined) {
    throw new Error('Нулевые аргументы');
  }

  return Account.findAll({
    include: [{
      attributes: ['type_name'],
      model: AccountType,
    }],
    where: {
      user_id: userId,
    },
    attributes: ['id', 'name', 'balance'],
  });
}

/*
  Получение всех типов счетов с их id
  Возвращает Promise<Array<Model>>
*/
async function getAccountTypes() {
  return AccountType.findAll();
}

/*
  Получение информации по конкретному счету
  Возвращает Promise<Model>
*/
async function getAccountById(accountId, userId) {
  if (accountId === undefined) return undefined;

  return Account.findOne({
    include: [{
      attributes: ['type_name'],
      model: AccountType,
    }],
    where: {
      id: accountId,
      user_id: userId,
    },
    attributes: ['id', 'name', 'balance'],
  });
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
