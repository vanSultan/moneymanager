const { models } = require('../models');

const { ExternalEntityUser } = models;

/*
Проверяет существует ли связь между пользователем и сущностью
Возвращает сущность связи, если она существует, иначе undefined
 */
async function checkEntityUserConnection(entityId, userId) {
  if (entityId === undefined || userId === undefined) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntityUser.findOne({
    where: {
      user_id: userId,
      external_entity_id: entityId,
    },
  });
}

/*
Создает связь Пользователь-Внешняя сущность
Возвращает сущность связи в случае успеха, иначе undefined
 */
async function connectEntityUser(entityId, userId) {
  if (entityId === undefined || userId === undefined) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntityUser.create({
    user_id: userId,
    external_entity_id: entityId,
  });
}
