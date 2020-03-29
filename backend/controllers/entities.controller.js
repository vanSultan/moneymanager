const { models } = require('../models');

const { ExternalEntity, ExternalEntityUser } = models;

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
  Возвращает id связи в случае успеха, иначе undefined
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

/*
  Получение id Сущности по имени
  В случае успеха возвращает ее id, иначе undefined
*/
async function getEntityIdByName(entityName) {
  if (entityName === undefined) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntity.findOne({
    attributes: ['id'],
    where: {
      name: entityName,
    },
  }).id;
}

/*
  Проверяет существование внешней сущности по id
  В случае успеха возвращает ее имя, иначе undefined
*/
async function getEntityNameById(entityId) {
  if (entityId === undefined) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntity.findOne({
    attributes: ['name'],
    where: {
      id: entityId,
    },
  }).name;
}
