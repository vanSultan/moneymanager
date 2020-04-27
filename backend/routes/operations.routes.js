const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  getOperations,
  createOperation,
  updateOperation,
  deleteOperation,
} = require('../controllers/operations.controllers');

const router = Router(sequelize);

// /operations
router.get('/', auth, async (req, res) => {
  try {
    const operationQuery = req.query;
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет получить операции`);

    return getOperations(operationQuery, userId)
      .then((operationsList) => {
        const list = [];
        operationsList.forEach((operation) => {
          list.push({
            id: operation.id,
            from: operation.account_from_id,
            to: operation.account_to_id,
            value: operation.value,
            userDateTime: operation.updated_at,
            categoryId: operation.category_id,
            externalEntityId: operation.external_entity_id,
            comment: operation.comment,
          });
        });
        return res.status(200).json(list);
      })
      .catch((e) => {
        logger.error(e.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
      });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

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

// /operations/{operationId}
router.put('/:operationId', auth, async (req, res) => {
  try {
    const { operationId } = req.params;
    const operationInfo = req.body;
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет обновить операцию`);

    return updateOperation(operationInfo, operationId, userId)
      .then(() => res.status(200).json({ message: 'Операция обновлена' }))
      .catch((e) => {
        logger.error(e.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
      });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// /operations/{operationId}
router.delete('/:operationId', auth, async (req, res) => {
  try {
    const { operationId } = req.params;
    const { userId } = req.user;
    logger.debug(`Пользователь ${userId} хочет удалить операцию`);

    return deleteOperation(operationId, userId)
      .then(() => res.status(200).json({ message: 'Операция удалена' }))
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
