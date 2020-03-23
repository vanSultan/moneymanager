const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();

chai.use(chaiHttp);

describe('/POST user', () => {
  it('it should create new user', (done) => {
    const user = {
      login: 'new_user',
      password: 'new_passwrod',
    };
    chai.request(server)
      .post('/api/auth/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Пользователь создан');
        done();
      });
  });
  it('it should return an error on existing user', (done) => {
    const user = {
      login: 'existing_user',
      password: 'existing_password',
    };
    chai.request(server)
      .post('/api/auth/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Такой пользователь уже существует');
        done();
      });
  });
  it('it should return an error on invalid password (less then 6 chars)', (done) => {
    const user = {
      login: 'unknown user',
      password: '',
    };
    chai.request(server)
      .post('/api/auth/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.message.should.be.equal('Некорректные данные при регистрации');
        done();
      });
  });
});
