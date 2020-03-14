const {Router} = require('express');
const sequelize = require('sequelize');
const db = require('../models');
const {UserProfile} = db;
const auth = require('../middleware/auth.middleware');
const router = Router(sequelize);

// /users/profile
router.get('/profile', auth, async (req, res) => {
    try {
        const userProfile = await UserProfile.findByPk(req.user.userId);

        res.status(201).json({
            name: userProfile.name,
            surname: userProfile.surname,
            email: userProfile.email
        });
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

module.exports = router;
