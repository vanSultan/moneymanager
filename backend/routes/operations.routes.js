const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const { createOperation } = require('../controllers/operations.controllers');

const router = Router(sequelize);

// /operations
router.post('/', auth, async (req, res) => {
  try {
    const operationInfo = req.body;
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет добавить операцию`);

    return createOperation(operationInfo, userId)
      .then((operation) => res.status(201).json({ id: operation.id }))
      .catch((e) => {
        logger.error(e.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
      });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
