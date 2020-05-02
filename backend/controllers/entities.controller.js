const { models } = require('../models');

const { ExternalEntity, ExternalEntityUser } = models;

/**
 * @description Создает связь Пользователь-Внешняя сущность
 * @param entityId {number} - id сущности
 * @param userId {number} - id пользователя
 * @returns {Promise<number>}
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


/**
 * @description Получение id Сущности по имени
 * @param entityName {string} - название сущности
 * @returns {Promise<Model>}
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


/**
 * @description  Создает новую внешнюю сущность
 * @param entityName {string} - название сущности
 * @returns {Promise<Model>}
 */
async function createNewEntity(entityName) {
  if (entityName === null) {
    throw new Error('Undefined arguments');
  }

  return ExternalEntity.create({
    name: entityName,
  });
}

/**
 * @description Добавляет пользователю внешнюю сущность
 * @param entityName {string} - название сущности
 * @param userId {number} - id пользователя
 * @returns {Promise<number>}
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


/**
 * @description Получает информацию о внешней сущности пользователя по ее id и id пользователя.
 * @param entityId {number} - id сущности
 * @param userId {number} - id пользователя
 * @returns {Promise<Model>}
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


/**
 * @description Получает внешние сущности пользователя
 * @param userId {number} - id пользователя
 * @returns {Promise<Array<Model>>}
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


/**
 * @description  Обновляет название Сущности у пользователя
 * @param entityId {number} - id сущности
 * @param entityName {string} - новое название сущности
 * @param userId {number} - id пользователя
 * @returns {Promise<Array<number,number>>}
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


/**
 * @description Удаляет Сущность, если пользователи ее не используют
 * @param entityId {number} - id сущности
 * @returns {Promise<number>}
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


/**
 * @description Удаляет внешнюю сущность у пользователя
 * @param entityId {number} - id сущности
 * @param userId {number} - id пользователя
 * @returns {Promise<number>}
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
