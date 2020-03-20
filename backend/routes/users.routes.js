const { Router } = require('express');
const sequelize = require('sequelize');

const auth = require('../middleware/auth.middleware');
const { getUserProfile } = require('../controllers/users.controller');
const logger = require('../config/logger').appLogger;

const router = Router(sequelize);

// /users/profile
router.get('/profile', auth, async (req, res) => {
  try {
    return await getUserProfile(req, res);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
