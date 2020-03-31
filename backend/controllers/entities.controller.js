const logger = require('../config/logger').appLogger;
const { models } = require('../models');

const { ExternalEntity, ExternalEntityUser } = models;

/*
  Проверяет существует ли связь между пользователем и сущностью
  Возвращает сущность связи, если она существует, иначе null
*/
// async function checkEntityUserConnection(entityId, userId) {
//   if (entityId === null || userId === null) {
//     throw new Error('Undefined arguments');
//   }
//
//   return ExternalEntityUser.findOne({
//     where: {
//       user_id: userId,
//       external_entity_id: entityId,
//     },
//   });
// }

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
  Удаляет связь Сущность-Пользователь
 */
// async function deleteEntityUserConnection(entityId, userId) {
//   if (entityId === null || userId === null) {
//     throw new Error('Undefined arguments');
//   }
//
//   return ExternalEntityUser.delete({
//     where: {
//       user_id: userId,
//       external_entity_id: entityId,
//     },
//   });
// }

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
  Проверяет существование внешней сущности по id
  В случае успеха возвращает ее имя, иначе null
*/
// async function getEntityNameById(entityId) {
//   if (entityId === null) {
//     throw new Error('Undefined arguments');
//   }
//
//   return ExternalEntity.findOne({
//     attributes: ['name'],
//     where: {
//       id: entityId,
//     },
//   }).name;
// }

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

// async function checkEntityConnections(entityId) {
//   const connections = ExternalEntityUser.findAll({
//     where: {
//       external_entity_id: entityId,
//     },
//   });
//
//   return connections.length !== 0;
// }
//
// async function deleteExternalEntity(entityId) {
//   return ExternalEntity.delete({
//     where: {
//       id: entityId,
//     },
//   });
// }

/*
  Удаляет связь Сущность-Пользователь по id
  Возвращет true, если связь была удалена, иначе false
*/
// async function deleteEntityUser(entityId, userId) {
//   if (entityId === null || userId === null) {
//     throw new Error('Undefined arguments');
//   }
//
//   if (await checkEntityUserConnection(entityId, userId) !== null) {
//     await deleteEntityUserConnection(entityId, userId);
//     if (await checkEntityConnections(entityId) === false) {
//       await deleteExternalEntity(entityId);
//     }
//   } else {
//     return false;
//   }
//
//   return true;
// }

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

// async function updateEntityUserRelation(entityId, newEntityId) {
//   return ExternalEntityUser.update({
//     external_entity_id: newEntityId,
//   }, {
//     where: {
//       external_entity_id: entityId,
//     },
//   });
// }

// async function updateEntityName(entityId, newEntityName, userId) {
//   if (entityId === null || newEntityName === null) {
//     throw new Error('Undefined arguments');
//   }
//
//   if (await checkEntityUserConnection(entityId, userId) !== null) {
//     let newEntityId = await getEntityIdByName(newEntityName);
//     if (newEntityId === null) {
//       newEntityId = await createExternalEntity(newEntityName);
//     }
//     return await updateEntityUserRelation(entityId, newEntityId) !== null;
//   }
//   return false;
// }

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

module.exports = {
  addEntityToUser,
  getUserEntities,
  getEntityInfo,
};
