const { models } = require('../models');

const { Operation } = models;

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
    updated_at: Date.parse(operationInfo.userDateTime), // RFC 3339, section 5.6
  });
}

module.exports = {
  createOperation,
};
