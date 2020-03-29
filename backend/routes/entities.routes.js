const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  createEntityUser,
  getInfoById,
} = require('../controllers/entities.controller');

const router = Router(sequelize);

// /api/externalEntities/
router.post(
  '/',
  auth,
  async (req, res) => {
    try {
      const entityName = req.body.name;
      const { userId } = req.user.userId;

      logger.info(`User ${userId} tries to create new entity ${entityName}`);

      const entityId = createEntityUser(entityName, userId);
      if (entityId === undefined) {
        return res.status(403).json({ message: 'Не удалось создать новую сущность' });
      }

      return res.status(200).json({ id: entityId });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

module.exports = router;
