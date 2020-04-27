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
  from: 0,
  to: 1,
  categoryId: 0,
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
      });
    done();
  });
});

function loginUser(auth) {
  return () => {
    request
      .post('/api/auth/login/')
      .send(user)
      .end(onResponse);
  };

  function onResponse(err, res) {
    auth.token = res.body.token;
    return done();
  }
}