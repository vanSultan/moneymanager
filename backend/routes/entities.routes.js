const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  addEntityToUser,
  getUserEntities,
  getEntityInfo,
  updateUserEntity,
  deleteUserEntity,
  deleteEntity,
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
          const list = [];
          for (let i = 0; i < entitiesList.length; i += 1) {
            list.push({
              id: entitiesList[i].id,
              name: entitiesList[i].name,
              popular_category_id: entitiesList[i].external_entity_users[0].popular_category_id,
            });
          }
          res.status(200).json(list);
        })
        .catch(() => {
          res.status(403).json({ message: 'Ошибка доступа' });
        });
    } catch (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/externalEntities/{entityId}
router.get(
  '/:entityId',
  auth,
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { entityId } = req.params;
      logger.info(`Пользователь ${userId} запросил информацию по сущности ${entityId}`);

      return getEntityInfo(entityId, userId)
        .then((entity) => {
          const info = {
            name: entity.name,
            popular_category_id: entity.external_entity_users[0].popular_category_id,
          };
          return res.status(200).json(info);
        })
        .catch(() => {
          res.status(403).json({ message: 'Ошибка доступа' });
        });
    } catch (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/externalEntities/{entityId}
router.put(
  '/:entityId',
  auth,
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { entityId } = req.params;
      const newEntityName = req.body.name;
      logger.info(`Пользователь ${userId} пытается обновить сущность ${entityId} на ${newEntityName}`);

      return updateUserEntity(entityId, newEntityName, userId)
        .then(() => {
          res.status(200).json();
        })
        .catch(() => {
          res.status(403).json({ message: 'Операция не выполнена' });
        });
    } catch (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/externalEntities/{entityId}
router.delete(
  '/:entityId',
  auth,
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { entityId } = req.params;
      logger.info(`Пользователь ${userId} пытается удалить сущность ${entityId}`);

      return deleteUserEntity(entityId, userId)
        .then(() => {
          deleteEntity(entityId);
          return res.status(200).json();
        })
        .catch(() => {
          res.status(403).json({ message: 'Операция не выполнена' });
        });
    } catch (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

module.exports = router;
