const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  createAccount,
  getUserAccounts,
  getAccountTypes,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require('../controllers/accounts.controller');

const router = Router(sequelize);

// /api/accounts/
router.post(
  '/',
  auth,
  async (req, res) => {
    try {
      const accountInfo = req.body;
      const { userId } = req.user;
      logger.info(`Пользователь ${userId} хочет создать счет ${accountInfo}`);
      return createAccount(accountInfo, userId)
        .then((account) => {
          const id = account.get('id');
          res.status(201).json({ accountId: id });
        })
        .catch(() => {
          res.status(403).json({ message: 'Не получилось создать новый счет' });
        });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const { userId } = req.user;
      logger.info(`Пользователь ${userId} хочет получить список счетов`);

      return getUserAccounts(userId)
        .then((list) => {
          const resList = [];
          for (let i = 0; i < list.length; i += 1) {
            resList.push({
              id: list[i].id,
              name: list[i].name,
              balance: list[i].balance,
              type_name: list[i].account_type.type_name,
            });
          }
          res.status(200).json(resList);
        })
        .catch(() => res.status(403).json({ message: 'Ошибка доступа' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/types/
router.get(
  '/types/',
  auth,
  async (req, res) => {
    try {
      logger.info(`Пользователь ${req.user.userId} хочет получить список типов счетов`);
      return getAccountTypes()
        .then((list) => res.status(200).json(list))
        .catch(() => res.status(403).json({ message: 'Ошибка доступа' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/:accountId
router.get(
  '/:accountId',
  auth,
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;

      return getAccountById(accountId, userId)
        .then((entity) => {
          const accountInfo = {
            id: entity.id,
            name: entity.name,
            balance: entity.balance,
            type_name: entity.account_type.type_name,
          };
          return res.status(200).json(accountInfo);
        })
        .catch(() => res.status(400).json({ message: 'Такого счета не существует' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

router.put(
  '/:accountId',
  auth,
  async (req, res) => {
    try {
      const code = await updateAccount(req.params.accountId, req.body, req.user.userId);
      if (code !== undefined) {
        return res.status(200).json({ message: 'Счет успешно обновлен' });
      }
      return res.status(403).json({ message: 'Счет не найден' });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

router.delete(
  '/:accountId',
  auth,
  async (req, res) => {
    try {
      const code = await deleteAccount(req.params.accountId, req.user.userId);
      if (code !== undefined) {
        return res.status(200).json({ message: 'Счет успешно удален' });
      }
      return res.status(403).json({ message: 'Счет не найден' });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

module.exports = router;
