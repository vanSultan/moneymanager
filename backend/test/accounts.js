const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { gt } = require('../models').db.Sequelize.Op;

const { models } = require('../models');

const { User, Account } = models;

// Чтобы держать сессию
let token = '';

chai.should();
chai.use(chaiHttp);

const testUserData = {
  login: 'test2',
  password: '1234567',
};

const testAccountData = {
  name: 'test',
  type_id: 0,
  balance: 0,
};

describe('/api/accounts/', () => {
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

  // После каждого тесткейса вычищаем таблицу account
  // afterEach((done) => {
  //   Account
  //     .destroy({
  //       where: {
  //         [gt]:
  //         { id: 2 },
  //       },
  //       truncate: false,
  //     })
  //     .then(() => done());
  // });

  it('should create new account', (done) => {
    chai.request(server)
      .post('/api/accounts/')
      .set('authorization', `Bearer ${token}`)
      .send(testAccountData)
      .then((res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');

        done();
      });
  });

  it('should return 403 for invalid type data', (done) => {
    const invalidTestAccountData = {
      name: 'test',
      type_id: -1,
      balance: 0,
    };
    chai.request(server)
      .post('/api/accounts/')
      .set('authorization', `Bearer ${token}`)
      .send(invalidTestAccountData)
      .then((res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Не получилось создать новый счет');

        done();
      });
  });

  // it('should return empty array', (done) => {
  //   const expectedResult = [];
  //
  //   chai.request(server)
  //     .get('/api/accounts/')
  //     .set('authorization', `Bearer ${token}`)
  //     .send()
  //     .then((res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a('array');
  //       res.body.should.be.deep.equal(expectedResult);
  //
  //       done();
  //     });
  // });

  it('should return array with created accounts', (done) => {
    const expectedResult = {
      id: 3,
      name: 'test',
      balance: 0,
      type_id: 0,
    };

    chai.request(server)
      .get('/api/accounts/')
      .set('authorization', `Bearer ${token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.be.deep.equal(expectedResult);

        done();
      });
  });

  it('should return 401 without credentials', (done) => {
    chai.request(server)
      .get('/api/accounts/')
      .send()
      .then((res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Ошибка при авторизации');

        done();
      });
  });

  it('should return types', (done) => {
    // const expectedResult = [{ id: 1, type_name: 'cash' },
    //   { id: 2, type_name: 'bank_card' },
    //   { id: 3, type_name: 'savings_account' }];

    chai.request(server)
      .get('/api/accounts/types/')
      .set('authorization', `Bearer ${token}`)
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.greaterThan(0);

        done();
      });
  });

  it('should return created account by id', (done) => {
    const expectedResult = {
      id: 3,
      name: 'test',
      balance: 0,
      type_id: 0,
    };

    chai.request(server)
      .get(`/api/accounts/${expectedResult.id}/`)
      .set('authorization', `Bearer ${token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.be.deep.equal(expectedResult);

        done();
      });
  });

  it('should return 403 for uncreated account', (done) => {
    const nonExistentAccountId = -1;

    chai.request(server)
      .get(`/api/accounts/${nonExistentAccountId}/`)
      .set('authorization', `Bearer ${token}`)
      .send()
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Такого счета не существует');

        done();
      });
  });

  it('should change data for created account', (done) => {
    const newTestAccountData = {
      id: 3,
      name: 'tested',
      balance: 0,
      type_id: 1,
    };

    chai.request(server)
      .put(`/api/accounts/${newTestAccountData.id}/`)
      .set('authorization', `Bearer ${token}`)
      .send(newTestAccountData)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Счет успешно обновлен');

        done();
      });
  });

  it('should delete created account', (done) => {
    chai.request(server)
      .delete('/api/accounts/3')
      .set('authorization', `Bearer ${token}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Счет успешно удален');

        done();
      });
  });

  // Удаляем пользователя после всех тестов
  // after((done) => {
  //   User.destroy({ where: {}, truncate: false })
  //     .then(() => done());
  // });
});
