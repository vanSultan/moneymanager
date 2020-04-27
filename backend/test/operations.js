const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

const user = {
  login: 'operations_user',
  password: 'operations_password',
};

const newOperation = {
  operationType: 0,
  from: 0,
  to: 1,
  value: 1000,
  userDate: '2020-04-27T01:22:59.940Z',
  category: 0,
  comment: 'string',
};

let token;

describe('/api/operations', () => {
  before('Авторизация пользователя', (done) => {
    chai.request(server)
      .post('/api/auth/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(server)
          .post('/api/auth/login/')
          .send(user)
          .end((error, response) => {
            response.should.have.status(200);
            token = response.body.token;
          });
      });
    chai.request(server)
      .post('/api/');
    done();
  });

  it('Создание новой операции', (done) => {
    chai.request(server)
      .post('/api/auth/register/')
      .set('authorization', `Bearer ${token}`)
      .send(newOperation)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
      });
    done();
  });
});
