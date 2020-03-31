const logger = require('../config/logger').appLogger;
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
  Удаляет связь Сущность-Пользователь
 */
async function deleteEntityUserConnection(entityId, userId) {
  if (entityId === undefined || userId === undefined) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntityUser.delete({
    where: {
      user_id: userId,
      external_entity_id: entityId,
    },
  });
}

/*
  Получение id Сущности по имени
  Возвращает Promise<Model>
*/
async function getEntityIdByName(entityName) {
  if (entityName === undefined) {
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

/*
  Создает новую внешнюю сущность
  В случае успеха возвращает Promise<Model>
*/
async function createNewEntity(entityName) {
  if (entityName === undefined) {
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
  if (entityName === undefined || userId === undefined) {
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

async function checkEntityConnections(entityId) {
  const connections = ExternalEntityUser.findAll({
    where: {
      external_entity_id: entityId,
    },
  });

  return connections.length !== 0;
}

async function deleteExternalEntity(entityId) {
  return ExternalEntity.delete({
    where: {
      id: entityId,
    },
  });
}

/*
  Удаляет связь Сущность-Пользователь по id
  Возвращет true, если связь была удалена, иначе false
*/
async function deleteEntityUser(entityId, userId) {
  if (entityId === undefined || userId === undefined) {
    throw new Error('Undefined arguments');
  }

  if (await checkEntityUserConnection(entityId, userId) !== undefined) {
    await deleteEntityUserConnection(entityId, userId);
    if (await checkEntityConnections(entityId) === false) {
      await deleteExternalEntity(entityId);
    }
  } else {
    return false;
  }

  return true;
}

/*
  Получает информацию о внешней сущности по ее id и id пользователя.
  Возвращает объект в случае успеха, undefined если пользователя нет такой сущности
*/
async function getInfoById(entityId, userId) {
  if (entityId === undefined) {
    throw new Error('Undefined arguments');
  }

  let entityInfo;
  const entityName = await getEntityNameById(entityId);
  if (entityName !== undefined) {
    const entityUser = await checkEntityUserConnection(entityId, userId);
    if (entityUser !== undefined) {
      entityInfo = {
        name: entityName,
        categoryId: entityUser.popular_category_id,
      };
    }
  }

  return entityInfo;
}

async function updateEntityUserRelation(entityId, newEntityId) {
  return ExternalEntityUser.update({
    external_entity_id: newEntityId,
  }, {
    where: {
      external_entity_id: entityId,
    },
  });
}

async function updateEntityName(entityId, newEntityName, userId) {
  if (entityId === undefined || newEntityName === undefined) {
    throw new Error('Undefined arguments');
  }

  if (await checkEntityUserConnection(entityId, userId) !== undefined) {
    let newEntityId = await getEntityIdByName(newEntityName);
    if (newEntityId === undefined) {
      newEntityId = await createExternalEntity(newEntityName);
    }
    return await updateEntityUserRelation(entityId, newEntityId) !== undefined;
  }
  return false;
}

/*
  Получает внешние сущности пользователя
  Возвращвет Promise<Array<Model>>
*/
async function getUserEntities(userId) {
  if (userId === undefined) {
    throw new Error('Нулевые аргументы');
  }

  return ExternalEntity.findAll({
    include: [{
      attributes: [],
      model: ExternalEntityUser,
      where: {
        user_id: userId,
      },
    }],
    attributes: ['id', 'name'],
  });
}

module.exports = {
  addEntityToUser,
  getUserEntities,
};
