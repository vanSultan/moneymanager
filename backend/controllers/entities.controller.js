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

/*
  Создает новую внешнюю сущность
  В случае успеха возвращает ее id, иначе undefined
*/
async function createExternalEntity(entityName) {
  if (entityName === undefined) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntity.create({
    name: entityName,
  });
}

/*
  Создает новую внешнюю сущность, если такой не существует, а затем привязывает ее к пользователю
  Вернет id внешней сущности в случае успеха, иначе undefined
*/
async function createEntityUser(entityName, userId) {
  if (entityName === undefined || userId === undefined) {
    throw new Error('Undefined arguments');
  }

  let entityId = getEntityIdByName(entityName);
  if (entityId === undefined) {
    entityId = createExternalEntity(entityName);
  }

  if (await checkEntityUserConnection(entityId, userId) === undefined) {
    await connectEntityUser(entityId, userId);
  } else {
    return undefined;
  }

  return entityId;
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

async function getUserEntities(userId) {
  if (userId === undefined) {
    throw new Error('Undefined arguments');
  }

  const userEntities = [];
  const entities = await ExternalEntityUser.getAll({
    include: [{
      model: ExternalEntity,
    }],
    where: {
      user_id: userId,
    },
  });

  if (entities !== undefined) {
    for (let i = 0; i < entities.length; i += 1) {
      userEntities.push({
        id: entities[i].external_entity.id,
        name: entities[i].external_entity.name,
      });
    }
  }

  return userEntities;
}

module.exports = {
  createEntityUser,
  getInfoById,
  deleteEntityUser,
  updateEntityName,
  getUserEntities,
};
