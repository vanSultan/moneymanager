const { models } = require('../models');

const { ExternalEntity, ExternalEntityUser } = models;

/*
  Создает связь Пользователь-Внешняя сущность
  Возвращает id связи в случае успеха, иначе null
*/
async function connectEntityUser(entityId, userId) {
  if (entityId === null || userId === null) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntityUser.create({
    user_id: userId,
    external_entity_id: entityId,
  });
}

/*
  Получение id Сущности по имени
  Возвращает Promise<Model>
*/
async function getEntityIdByName(entityName) {
  if (entityName === null) {
    throw new Error('Нулевые аргументы');
  }

  return ExternalEntity.findOne({
    attributes: ['id'],
    where: {
      name: entityName,
    },
  });
}

/*
  Создает новую внешнюю сущность
  В случае успеха возвращает Promise<Model>
*/
async function createNewEntity(entityName) {
  if (entityName === null) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntity.create({
    name: entityName,
  });
}

/*
  Добавляет пользователю внешнюю сущность
  Возвращает Promise<number>
*/
async function addEntityToUser(entityName, userId) {
  if (entityName === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return getEntityIdByName(entityName)
    .then((entity) => {
      if (entity === null) {
        return createNewEntity(entityName);
      }
      return entity;
    })
    .then(
      (entity) => {
        if (entity === null) {
          throw new Error('Не удалось создать сущность');
        }
        return connectEntityUser(entity.get('id'), userId);
      },
      () => { throw new Error('Не удалось создать новую сущность'); },
    )
    .then(
      (entityUser) => entityUser.get('external_entity_id'),
      () => {
        throw new Error('Не удалось добавить пользователю новую сущность');
      },
    )
    .catch((err) => {
      throw err;
    });
}

/*
  Получает информацию о внешней сущности пользователя по ее id и id пользователя.
  Возвращает Promise<Model>
*/
async function getEntityInfo(entityId, userId) {
  if (entityId === null || userId === null) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntity.findOne({
    include: [{
      attributes: ['popular_category_id'],
      model: ExternalEntityUser,
      where: {
        user_id: userId,
        external_entity_id: entityId,
      },
    }],
    attributes: ['name'],
  });
}

/*
  Получает внешние сущности пользователя
  Возвращвет Promise<Array<Model>>
*/
async function getUserEntities(userId) {
  if (userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return ExternalEntity.findAll({
    include: [{
      attributes: ['popular_category_id'],
      model: ExternalEntityUser,
      where: {
        user_id: userId,
      },
    }],
    attributes: ['id', 'name'],
  });
}

/*
  Обновляет название Сущности у пользователя
  Возвращает Promise<Array<number,number>>
*/
async function updateUserEntity(entityId, newEntityName, userId) {
  if (entityId === null || newEntityName === null || userId === null) {
    throw new Error('Нулевые аргументы функции');
  }

  return ExternalEntity.findOrCreate({
    where: {
      name: newEntityName,
    },
  }).then((newEntity) => {
    const newEntityId = newEntity[0].id;
    return ExternalEntityUser.update({
      external_entity_id: newEntityId,
    }, {
      where: {
        user_id: userId,
        external_entity_id: entityId,
      },
    });
  }).catch(() => {
    throw new Error('Не удалось обновить пользовательскую сущность');
  });
}

/*
  Удаляет Сущность, если пользователи ее не используют
  Возвращает Promise<number>
*/
async function deleteEntity(entityId) {
  if (entityId === null) return;

  ExternalEntityUser.findAll({
    where: {
      external_entity_id: entityId,
    },
  }).then((list) => {
    if (list.length === 0) {
      ExternalEntity.destroy({
        where: {
          id: entityId,
        },
      });
    }
  });
}

/*
  Удаляет внешнюю сущность у пользователя
  Возвращает Promise<number>
*/
async function deleteUserEntity(entityId, userId) {
  if (entityId === null || userId === null) {
    throw new Error('Нулевые аргументы функции');
  }

  return ExternalEntityUser.destroy({
    where: {
      user_id: userId,
      external_entity_id: entityId,
    },
  });
}

module.exports = {
  addEntityToUser,
  getUserEntities,
  getEntityInfo,
  updateUserEntity,
  deleteUserEntity,
  deleteEntity,
};
