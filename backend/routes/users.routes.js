const { Router } = require('express');
const sequelize = require('sequelize');
const auth = require('../middleware/auth.middleware');

const router = Router(sequelize);
const { getUserProfile } = require('../controllers/users.controller');

// /users/profile
router.get('/profile', auth, async (req, res) => {
  try {
    await getUserProfile(req, res);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
