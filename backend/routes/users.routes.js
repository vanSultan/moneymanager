/**
 * ROUTERS
 * @module routers/users
 */
const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUsers,
  checkRole,
} = require('../controllers/users.controller');

const router = Router(sequelize);

// /users
router.get('/', auth,
  /**
     * @method /users GET
     * @description Получить список зарегистрированных пользователей
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const { userId } = req.user;
      logger.debug(`Пользователь ${userId} хочет получить список пользователй`);

      return checkRole('moderator', userId)
        .then((moderator) => {
          if (moderator === null) {
            return res.status(401).json({ message: 'Ошибка доступа' });
          }
          return getUsers().then((userList) => {
            const list = [];
            userList.forEach((user) => { list.push(user.login); });
            res.status(200).json(list);
          });
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

// /users/profile
router.get('/profile', auth,
  /**
     * @method /users/profile GET
     * @description  Получить профиль пользоваетля
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const { userId } = req.user;
      logger.debug(`Пользователь ${userId} хочет получить профиль`);

      return getUserProfile(userId)
        .then((model) => {
          if (model === null) {
            return res.status(204).json({ message: 'Информация отсутствует' });
          }
          return res.status(200).json(model);
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

// /users/profile
router.post('/profile', auth,
  /**
     * @method /users/profile POST
     * @description  Добавить профиль пользователя
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const userProfileInfo = req.body;
      const { userId } = req.user;
      logger.debug(`Пользователь ${userId} хочет создать профиль`);

      return createUserProfile(userProfileInfo, userId)
        .then(() => res.status(201).json({ message: 'Профиль добавлен' }))
        .catch((e) => {
          logger.error(e.message);
          return res.status(500).json({ message: 'Ошибка сервера' });
        });
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

// /users/profile
router.put('/profile', auth,
  /**
     * @method /users/profile PUT
     * @description  Обновить информацию профиля пользователя
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const userProfile = req.body;
      const { userId } = req.user;
      logger.debug(`Пользователь ${userId} хочет обновить профиль`);

      return updateUserProfile(userProfile, userId)
        .then(() => res.status(200).json({ message: 'Профиль обновлен' }))
        .catch((e) => {
          logger.error(e.message);
          return res.status(500).json({ message: 'Ошибка сервера' });
        });
    } catch (e) {
      logger.error(e.message);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

// /users/profile
router.delete('/profile', auth,
  /**
     * @method /users/profile DELETE
     * @description  Удалить пользователя
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const { userId } = req.user;
      logger.debug(`Пользователь ${userId} хочет удалить профиль`);

      return deleteUserProfile(userId)
        .then(() => res.status(200).json({ message: 'Профиль удален' }))
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
