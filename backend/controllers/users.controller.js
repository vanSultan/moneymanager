const { models } = require('../models');

const { UserProfile, User, Role } = models;


/**
 * @description Получение профиля пользователя
 * @param userId {number} - id пользователя
 * @returns {Promise<Model>}
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


/**
 * @description Получение списка пользователей
 * @returns {Promise<Array<Model>>}
 */
async function getUsers() {
  return User.findAll({
    attributes: ['login'],
  });
}

/**
 * @description Проверка роли пользователя
 * @param roleName {string} - название роли
 * @param userId {number} - id пользователя
 * @returns {Promise<Model>}
 */
async function checkRole(roleName, userId) {
  const rolePromise = Role.findOne({ where: { name: roleName } });

  return rolePromise
    .then((role) => User.findOne({ where: { id: userId, role_id: role.id } }));
}


/**
 * @description  Создание нового профиля
 * @param userProfileInfo {Object} - информаци о профиле
 * @param userId {number} - id пользователя
 * @returns {Promise<Model>}
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


/**
 * @description Обновление информации о профиле пользователя
 * @param userProfileInfo {Object} - информаци о профиле
 * @param userId {number} - id пользователя
 * @returns {Promise}
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

/**
 * @description Удаление пользовательского профиля
 * @param userId {number} - id пользователя
 * @returns {Promise}
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
  getUsers,
  checkRole,
};
