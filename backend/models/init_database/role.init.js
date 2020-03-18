module.exports = function initRole(RoleModel) {
  RoleModel.bulkCreate([
    { name: 'user' },
    { name: 'moderator' },
    // eslint-disable-next-line no-console
  ]).catch(() => { console.log('Role have already been initialized'); });
};
