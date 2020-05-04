/**
 * Модуль тестирования
 * @module test/operations
 */

/** Тестирование операций пользователя */
/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
let request = require('supertest')(server);

chai.should();
chai.use(chaiHttp);

const user = {
  login: 'default_user',
  password: 'default_password',
};

const newOperation = {
  from: 1,
  to: 2,
  categoryId: 0,
  externalEntityId: 0,
  value: 1000,
  comment: 'string',
  userDateTime: '2020-04-27T10:03',
};

const invalidOperation = {
  from: 2,
  to: 1,
  categoryId: -1,
  externalEntityId: 0,
  value: 1000,
  comment: 'string',
  userDateTime: '2020-04-27T10:03',
};

describe('/api/operations', () => {
  const auth = {};
  before(loginUser(auth));

  it('Создание новой операции', (done) => {
    chai.request(server)
      .post('/api/operations/')
      .set('Authorization', 'bearer ' + auth.token)
      .send(newOperation)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
  });
  it('Создание операции с ошибкой', (done) => {
    chai.request(server)
      .post('/api/operations/')
      .set('Authorization', 'bearer ' + auth.token)
      .send(invalidOperation)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Ошибка сервера');
        done();
      });
  });
  it('Получение списка операций', (done) => {
    chai.request(server)
      .get('/api/operations/')
      .set('Authorization', 'bearer ' + auth.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.equal(2);
        res.body[0].should.have.property('userDateTime');
        res.body[1].should.have.property('userDateTime');
        done();
      });
  });
  it('Получение списка операций по идентификатору', (done) => {
    chai.request(server)
      .put('/api/operations/0')
      .set('Authorization', 'bearer ' + auth.token)
      .send(newOperation)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Удаление операции', (done) => {
    chai.request(server)
      .delete('/api/operations/0')
      .set('Authorization', 'bearer ' + auth.token)
      .send(newOperation)
      .end((err, res)=> {
        res.should.have.status(200);
        done();
      });
  });
});

function loginUser(auth) {
  return (done) => {
    request
      .post('/api/auth/login/')
      .send(user)
      .end(onResponse);
    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}