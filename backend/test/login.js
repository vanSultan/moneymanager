/**
 * Модуль тестирования
 * @module test/login
 */

/** Тестирование авторизации пользователя */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

const notExistingUser = {
  login: 'some_user',
  password: 'some_password',
};

const defaultUser = {
  login: 'default_user',
  password: 'default_password',
};

const wrongPasswordUser = {
  login: 'default_user',
  password: 'not_default_password',
};

describe('/api/auth/login', () => {
  it('Авторизация несуществующего пользователя', (done) => {
    chai.request(server)
      .post('/api/auth/login/')
      .send(notExistingUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Пользователь не найден');
        done();
      });
  });

  it('Неверный пароль', (done) => {
    chai.request(server)
      .post('/api/auth/login/')
      .send(wrongPasswordUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.message.should.be.equal('Неверный пароль, попробуйте снова');
        done();
      });
  });

  it('Успешный вход', (done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });
});
