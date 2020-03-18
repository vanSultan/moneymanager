const initRole = require('./role.init');
const initAccountType = require('./account_type.init');
const initCategory = require('./category.init');

module.exports = function initDatabase(models) {
  initRole(models.Role);
  initAccountType(models.AccountType);
  initCategory(models.Category);
};
