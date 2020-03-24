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
} = require('../controllers/accounts');

const router = Router(sequelize);

router.post(
  '/',
  auth,
  async (req, res) => {
    logger.info('Create new account');
    try {
      const accountInfo = req.body;
      const id = await createAccount(accountInfo, req.user.userId);

      if (id !== undefined) {
        return res.status(200).json({
          accountId: id,
        });
      }

      return res.status(403).json({ message: 'Не получилось создать новый счет' });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      logger.info('Get all user\'s accounts');
      const list = await getUserAccounts(req.user.userId);
      return res.status(200).json(list);
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

router.get(
  '/types/',
  auth,
  async (req, res) => {
    try {
      const types = await getAccountTypes();
      return res.status(200).json(types);
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

router.get(
  '/:accountId',
  auth,
  async (req, res) => {
    try {
      const account = await getAccountById(req.params.accountId, req.user.userId);
      if (account !== undefined) {
        return res.status(200).json(account);
      }
      return res.status(400).json({ message: 'Такого счета не существует' });
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
