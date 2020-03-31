const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  addEntityToUser,
  getUserEntities,
} = require('../controllers/entities.controller');

const router = Router(sequelize);

// /api/externalEntities/
router.post(
  '/',
  auth,
  async (req, res) => {
    try {
      const entityName = req.body.name;
      const { userId } = req.user;
      logger.info(`Пользователь ${userId} хочет создать внешнюю сущность ${entityName}`);

      return addEntityToUser(entityName, userId)
        .then((entityId) => res.status(201).json({ id: entityId }))
        .catch(() => res.status(403).json({ message: 'Не удалось добавить внешнюю сущность' }));
    } catch (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/externalEntities/
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const { userId } = req.user;
      logger.info(`Пользователь ${userId} запросил список сущностей`);
      return getUserEntities(userId)
        .then((entitiesList) => {
          res.status(200).json(entitiesList);
        })
        .catch(() => {
          res.status(403).json({ message: 'Ошибка доступа' });
        });
    } catch (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

module.exports = router;
