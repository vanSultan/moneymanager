module.exports = function initCategory(CategoryModel) {
  CategoryModel.bulkCreate([
    { name: 'Прочее' },
    { name: 'Еда и напитки' },
    { name: 'Покупки' },
    { name: 'Жильё' },
    { name: 'Транспорт' },
    { name: 'Жизнь и развлечения' },
    { name: 'Связь, ПК' },
    { name: 'Финансовые расходы' },
    { name: 'Доход' },
    // eslint-disable-next-line no-console
  ]).catch(() => { console.log('Category have already been initialized'); });
};
