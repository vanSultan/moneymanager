const { models } = require('../models');
const { gte, lte, or } = require('../models').db.Sequelize.Op;

const { Operation } = models;

/*
  Формирование where-условия на основе параметров
  Возвращает Object
 */
function getWhereClauseFromParams(operationQuery) {
  const whereObject = Object();
  const dtBounds = Object();
  let dtFlag = false;

  if (operationQuery.accountId !== undefined) {
    Object.assign(whereObject, {
      [or]: [
        { account_from_id: operationQuery.accountId },
        { account_to_id: operationQuery.accountId },
      ],
    });
  }
  if (operationQuery.externalEntityId !== undefined) {
    Object.assign(whereObject, {
      external_entity_id: operationQuery.externalEntityId,
    });
  }
  if (operationQuery.categoryId !== undefined) {
    Object.assign(whereObject, {
      category_id: operationQuery.categoryId,
    });
  }
  if (operationQuery.from !== undefined) {
    dtFlag = true;
    Object.assign(dtBounds, {
      [gte]: new Date(operationQuery.from).toUTCString(),
    });
  }
  if (operationQuery.till !== undefined) {
    dtFlag = true;
    Object.assign(dtBounds, {
      [lte]: new Date(operationQuery.till).toUTCString(),
    });
  }
  if (dtFlag === true) {
    Object.assign(whereObject, {
      updated_at: dtBounds,
    });
  }

  return whereObject;
}

/*
  Получение списка операций
  Возвращает Promise<Array<Model>>
 */
async function getOperations(operationQuery, userId) {
  if (userId === null) {
    throw new Error('Нулевые аргументы');
  }

  const whereClause = getWhereClauseFromParams(operationQuery);
  Object.assign(whereClause, { user_id: userId });

  return Operation.findAll({
    where: whereClause,
  });
}

/*
  Создание новой операции
  Возвращает Promise<Model>
 */
async function createOperation(operationInfo, userId) {
  if (operationInfo === null || userId === null) {
    throw new Error('Нулевые аргументы');
  }

  return Operation.create({
    user_id: userId,
    account_from_id: operationInfo.from,
    account_to_id: operationInfo.to,
    category_id: operationInfo.categoryId,
    external_entity_id: operationInfo.externalEntityId,
    value: operationInfo.value,
    comment: operationInfo.comment,
    system_date: new Date(Date.now()).toUTCString(),
    updated_at: new Date(operationInfo.userDateTime).toUTCString(),
  });
}

module.exports = {
  getOperations,
  createOperation,
};
