/**
 * ROUTERS
 * @module routers/account
 */
const { Router } = require('express');
const sequelize = require('sequelize');
const logger = require('../config/logger').appLogger;
const auth = require('../middleware/auth.middleware');

const {
  createAccount,
  getUserAccounts,
  getAccountTypes,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require('../controllers/accounts.controller');

const router = Router(sequelize);

// /api/accounts/
router.post(
  '/',
  auth,
  /**
   * @method /api/accounts/ POST
   * @description  Создание нового счёта
   * @param req {Request} - запрос
   * @param res {Request} - ответ
   * @returns {Promise<*>}
   */
  async (req, res) => {
    try {
      const accountInfo = req.body;
      const { userId } = req.user;
      logger.info(`Пользователь ${userId} хочет создать счет ${accountInfo}`);
      return createAccount(accountInfo, userId)
        .then((account) => {
          const id = account.get('id');
          res.status(201).json({ accountId: id });
        })
        .catch(() => {
          res.status(403).json({ message: 'Не получилось создать новый счет' });
        });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/
router.get(
  '/',
  auth,
  /**
     * @method /api/accounts/ GET
     * @description  Получение списка счетов пользователя
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const { userId } = req.user;
      logger.info(`Пользователь ${userId} хочет получить список счетов`);

      return getUserAccounts(userId)
        .then((list) => {
          const resList = [];
          for (let i = 0; i < list.length; i += 1) {
            resList.push({
              id: list[i].id,
              name: list[i].name,
              balance: list[i].balance,
              type_id: list[i].type_id,
            });
          }
          res.status(200).json(resList);
        })
        .catch(() => res.status(403).json({ message: 'Ошибка доступа' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/types/
router.get(
  '/types/',
  auth,
  /**
     * @method  /api/accounts/types/ GET
     * @description Получение доступных типов счетов
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      logger.info(`Пользователь ${req.user.userId} хочет получить список типов счетов`);
      return getAccountTypes()
        .then((list) => res.status(200).json(list))
        .catch(() => res.status(403).json({ message: 'Ошибка доступа' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/:accountId
router.get(
  '/:accountId',
  auth,
  /**
     * @method  /api/accounts/:accountId GET
     * @description Получение информации о счете
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;
      logger.info(`Пользователь ${userId} запрашивает информацию по аккаунту ${accountId}`);

      return getAccountById(accountId, userId)
        .then((entity) => {
          const accountInfo = {
            id: entity.id,
            name: entity.name,
            balance: entity.balance,
            type_id: entity.type_id,
          };
          return res.status(200).json(accountInfo);
        })
        .catch(() => res.status(400).json({ message: 'Такого счета не существует' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/:accountId
router.put(
  '/:accountId',
  auth,
  /**
     * @method  /api/accounts/:accountId PUT
     * @description Изменение информации о счете
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;
      const accountInfo = req.body;
      logger.info(`Пользователь ${userId} хочет изменить счет ${accountId}`);

      return updateAccount(accountId, accountInfo, userId)
        .then(() => res.status(200).json({ message: 'Счет успешно обновлен' }))
        .catch(() => res.status(403).json({ message: 'Счет не найден' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

// /api/accounts/:accountId
router.delete(
  '/:accountId',
  auth,
  /**
     * @method  /api/accounts/:accountId DELETE
     * @description Удаление пользовательского счета
     * @param req {Request} - запрос
     * @param res {Request} - ответ
     * @returns {Promise<*>}
     */
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;
      logger.info(`Пользователь ${userId} хочет удалить счет ${accountId}`);
      return deleteAccount(accountId, userId)
        .then(() => res.status(200).json({ message: 'Счет успешно удален' }))
        .catch(() => res.status(403).json({ message: 'Счет не найден' }));
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

module.exports = router;
