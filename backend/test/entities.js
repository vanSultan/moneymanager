/**
 * Модуль тестирования
 * @module test/entities
 */

/** Тестирование сущностей */
/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const request = require('supertest')(server);

chai.should();
chai.use(chaiHttp);

const user = {
  login: 'default_user',
  password: 'default_password',
};

const newExternalEntity = {
  name: 'newExternalEntity',
};

const errorExternalEntity = {
  wrongTag: 'errorExternalEntity',
};

const updateEntity = {
  name: 'newEntityName',
};

/**
 * @description Функция авторизации пользователя
 * @param auth {Object} - структура данных авторизации
 */
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

describe('/api/entities/', () => {
  const auth = {};
  before(loginUser(auth));

  it('Создание новой внешней сущности', (done) => {
    chai.request(server)
      .post('/api/externalEntities/')
      .set('Authorization', `bearer ${auth.token}`)
      .send(newExternalEntity)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
  });

  it('Некорректное создание новой внешней сущности', (done) => {
    chai.request(server)
      .post('/api/externalEntities/')
      .set('Authorization', `bearer ${auth.token}`)
      .send(errorExternalEntity)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Получение списка внешних сущностей', (done) => {
    chai.request(server)
      .get('/api/externalEntities/')
      .set('Authorization', `bearer ${auth.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.greaterThan(0);
        done();
      });
  });

  it('Получение информации о внешней сущности по id', (done) => {
    chai.request(server)
      .get('/api/externalEntities/0')
      .set('Authorization', `bearer ${auth.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('popular_category_id');
        done();
      });
  });

  it('Получение информации о внешней несуществующей сущности по id', (done) => {
    chai.request(server)
      .get('/api/externalEntities/-1')
      .set('Authorization', `bearer ${auth.token}`)
      .end((err, res) => {
        res.should.have.status(500);
        res.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Обновление информации о новой внешней сущности', (done) => {
    chai.request(server)
      .put('/api/externalEntities/1')
      .set('Authorization', `bearer ${auth.token}`)
      .send(updateEntity)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        done();
      });
  });

  it('Удаление внешней сущности по id', (done) => {
    chai.request(server)
      .delete('/api/externalEntities/1')
      .set('Authorization', `bearer ${auth.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
