const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Чтобы держать сессию
let token = '';

chai.should();
chai.use(chaiHttp);

const user = {
  login: 'categories_user',
  password: 'categories_password',
};

const newCategory = {
  name: 'test_category_name',
  parentCategoryId: 0,
};

const errorCategory = {
  name: 'error_category_name',
  parentCategoryId: -1,
};

const getCategory = {
  id: 11,
  name: 'test_category_name',
  status: true,
  parentCategoryId: 0,
};

const updatedCategory = {
  id: 11,
  name: 'updated_name',
  status: true,
  parentCategoryId: 0,
};

describe('/api/categories/', () => {
  before((done) => {
    chai.request(server)
      .post('/api/auth/register/')
      .send(user)
      .then(() => chai.request(server)
        .post('/api/auth/login/')
        .send(user))
      .then((res) => {
        token = res.body.token;

        done();
      });
  });

  it('Получение списка доступных категорий', (done) => {
    chai.request(server)
      .get('/api/categories/')
      .set('authorization', `Bearer ${token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.equal(10);
        done();
      });
  });

  it('Создание новой категории', (done) => {
    chai.request(server)
      .post('/api/categories/')
      .set('authorization', `Bearer ${token}`)
      .send(newCategory)
      .then((res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
  });

  it('Создание категории с ошибкой', (done) => {
    chai.request(server)
      .post('/api/categories/')
      .set('authorization', `bearer ${token}`)
      .send(errorCategory)
      .then((res) => {
        res.should.have.status(500);
        res.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Получение информации о категории по id', (done) => {
    chai.request(server)
      .get(`/api/categories/${getCategory.id}`)
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.be.equal(getCategory.name);
        done();
      });
  });

  it('Получение информации о категории по некорректному id', (done) => {
    chai.request(server)
      .get('/api/categories/-1')
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Обновление информации о категории по id', (done) => {
    chai.request(server)
      .put(`/api/categories/${getCategory.id}`)
      .set('authorization', `bearer ${token}`)
      .send(updatedCategory)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Категория обновлена');
        done();
      });
  });

  it('Удаление категории по id', (done) => {
    chai.request(server)
      .delete(`/api/categories/${getCategory.id}`)
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Категория удалена');
        done();
      });
  });
});
