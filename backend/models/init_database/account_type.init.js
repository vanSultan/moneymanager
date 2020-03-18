module.exports = async function initAccountType(AccountTypeModel) {
  AccountTypeModel.bulkCreate([
    { type_name: 'cash' },
    { type_name: 'bank_card' },
    { type_name: 'savings_account' },
    // eslint-disable-next-line no-console
  ]).catch(() => { console.log('AccountType have already been initialized'); });
};
