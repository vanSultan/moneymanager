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

/*
  Создание нового профиля
  Возвращает Promise<Model>
 */
async function createUserProfile(userProfileInfo, userId) {
  if (userProfileInfo === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return UserProfile.create({
    user_id: userId,
    email: userProfileInfo.email,
    name: userProfileInfo.name,
    surname: userProfileInfo.surname,
  });
}

/*
  Обновление информации о профиле пользователя
  Возвращает Promise
 */
async function updateUserProfile(userProfileInfo, userId) {
  if (userProfileInfo === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return UserProfile.update(
    {
      email: userProfileInfo.email,
      name: userProfileInfo.name,
      surname: userProfileInfo.surname,
    },
    {
      where: {
        user_id: userId,
      },
    },
  );
}

/*
  Удаление пользовательского профиля
  Возвращает Promise
 */
async function deleteUserProfile(userId) {
  if (userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return UserProfile.destroy({
    where: {
      user_id: userId,
    },
  });
}

module.exports = {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
