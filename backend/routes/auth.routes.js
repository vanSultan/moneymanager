const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {app: appConfig} = require('../config/config');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const {check, validationResult} = require('express-validator');
const {models} = require('../models');
const {User, Role} = models;

const router = Router(sequelize);

// /auth/register
router.post(
    '/register',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                });
            }

            const {login, password} = req.body;

            const candidate = await User.findOne({ where: { login } });

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' });
            }

            const userRole = await Role.findOne({ where: { name: 'user' } });

            const hashedPassword = await bcrypt.hash(password, 12);
            User.create({
                login,
                password: hashedPassword,
                role_id: userRole.id
            });

            res.status(201).json({ message: 'Пользователь создан' })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }
);

// /auth/login
router.post(
    '/login',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                });
            }

            const  {login, password} = req.body;

            const user = await User.findOne({ where: { login } });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
            }

            const token = jwt.sign(
                { userId: user.id },
                appConfig.jwtSecret,
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: `Что-то не так, попробуйте снова: ${e.message}` });
        }
    }
);

module.exports = router;
