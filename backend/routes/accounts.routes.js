const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const { createAccount, getUserAccounts, getAccountTypes } = require('../controllers/accounts');

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
      return res.status(200).json({ list });
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

module.exports = router;
