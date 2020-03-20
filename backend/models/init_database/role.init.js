const logger = require('../../config/logger').appLogger;

module.exports = function initRole(RoleModel) {
  RoleModel.bulkCreate([
    { name: 'user' },
    { name: 'moderator' },
  ]).catch(() => { logger.info('Role have already been initialized'); });
};
