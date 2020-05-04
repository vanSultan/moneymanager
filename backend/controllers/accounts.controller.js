const { models } = require('../models');

const { Account, AccountType } = models;

/**
 * @description Создание нового счёта
 * @param accountInfo {Object} - структура с информацией об аккаунте
 * @param userId {Integer} - id пользователя
 * @returns {Promise<Account>}
 * @throws Error
 */
async function createAccount(accountInfo, userId) {
  if (accountInfo === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Account.create({
    user_id: userId,
    name: accountInfo.name,
    type_id: accountInfo.type_id,
    balance: accountInfo.balance,
  });
}


/**
 * @description Получение всех пользовательских счетов
 * @param userId
 * @returns Promise<Array<Model>>
 * @throws Error
 */
async function getUserAccounts(userId) {
  if (userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Account.findAll({
    where: {
      user_id: userId,
    },
    attributes: ['id', 'name', 'balance', 'type_id'],
  });
}

/**
 * @description Получение всех типов счетов и их id
 * @returns {Promise<Array<Model>>}
 */
async function getAccountTypes() {
  return AccountType.findAll();
}

/**
 * @description Получение информации по конкретному счёту
 * @param accountId {Integer} - id аккаунта
 * @param userId {Integer} - id пользователя
 * @returns {Promise<Model>}
 * @throws Error
 */
async function getAccountById(accountId, userId) {
  if (accountId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Account.findOne({
    where: {
      id: accountId,
      user_id: userId,
    },
    attributes: ['id', 'name', 'balance', 'type_id'],
  });
}

/**
 * @description Обновление информации по конкретному счету
 * @param accountId {integer} - id аккаунта
 * @param accountInfo {Object} - информация об аккаунте
 * @param userId {integer} - id пользователя
 * @throws Error
 */
async function updateAccount(accountId, accountInfo, userId) {
  if (accountId === null || accountInfo === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Account.update(
    {
      name: accountInfo.name,
      type_id: accountInfo.type_id,
      balance: accountInfo.balance,
    },
    {
      where: {
        user_id: userId,
        id: accountId,
      },
    },
  );
}

/**
 * @description Удаление пользовательского счёта
 * @param accountId {integer} - id аккаунта
 * @param userId {integer} - id пользователя
 * @returns Promise<number>
 * @throws Error
 */
async function deleteAccount(accountId, userId) {
  if (accountId === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Account.destroy({
    where: {
      user_id: userId,
      id: accountId,
    },
  });
}

module.exports = {
  createAccount,
  getUserAccounts,
  getAccountTypes,
  getAccountById,
  updateAccount,
  deleteAccount,
};
