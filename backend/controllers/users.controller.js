const { models } = require('../models');

const { UserProfile } = models;

/*
  Получение профиля пользователя
  Возвращает Promise<Model>
 */
async function getUserProfile(userId) {
  if (userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return UserProfile.findByPk(
    userId, {
      attributes: ['name', 'surname', 'email'],
    },
  );
}

module.exports = {
  getUserProfile,
};
