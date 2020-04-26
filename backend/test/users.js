const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const { models } = require('../models');

const { User, UserProfile } = models;

// Чтобы держать сессию
let token = '';

chai.should();
chai.use(chaiHttp);

const testUserData = {
  login: 'test',
  password: '1234567',
};

const testUserProfileData = {
  email: 'test@mail.ru',
  name: 'test',
  surname: 'surname',
};

describe('/api/profile/', () => {
  // Авторизуемся перед тестами
  before((done) => {
    chai.request(server)
      .post('/api/auth/register/')
      .send(testUserData)
      .then(() => chai.request(server)
        .post('/api/auth/login/')
        .send(testUserData))
      .then((res) => {
        token = res.body.token;

        done();
      });
  });

  // После каждого тесткейса вычищаем таблицу user profile
  afterEach((done) => {
    UserProfile
      .destroy({ where: {}, truncate: false })
      .then(() => done());
  });

  it('should create new user profile', (done) => {
    chai.request(server)
      .post('/api/users/profile/')
      .set('authorization', `Bearer ${token}`)
      .send(testUserProfileData)
      .then((res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Профиль добавлен');

        done();
      });
  });

  it('should return created user profile', (done) => {
    const expectedResult = {
      name: 'test',
      surname: 'surname',
      email: 'test@mail.ru',
    };

    chai.request(server)
      .post('/api/users/profile/')
      .set('authorization', `Bearer ${token}`)
      .send(testUserProfileData)
      .then(() => chai.request(server)
        .get('/api/users/profile/')
        .set('authorization', `Bearer ${token}`)
        .send())
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.be.deep.equal(expectedResult);

        done();
      });
  });

  it('should change created user profile', (done) => {
    const newTestUserProfileData = {
      email: 'test@mail.ru',
      name: 'tested',
      surname: 'surname',
    };

    chai.request(server)
      .post('/api/users/profile/')
      .set('authorization', `Bearer ${token}`)
      .send(testUserProfileData)
      .then(() => chai.request(server)
        .put('/api/users/profile/')
        .set('authorization', `Bearer ${token}`)
        .send(newTestUserProfileData))
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Профиль обновлен');

        done();
      });
  });

  it('should delete created user profile', (done) => {
    chai.request(server)
      .post('/api/users/profile/')
      .set('authorization', `Bearer ${token}`)
      .send(testUserProfileData)
      .then(() => chai.request(server)
        .delete('/api/users/profile/')
        .set('authorization', `Bearer ${token}`)
        .send())
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Профиль удален');

        done();
      });
  });

  // Удаляем пользователя после всех тестов
  after((done) => {
    User.destroy({ where: {}, truncate: true })
      .then(() => done());
  });
});

