const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('/POST user', () => {
  // eslint-disable-next-line no-undef
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
  // eslint-disable-next-line no-undef
  it('it should return an error on existing user', (done) => {
    const user = {
      login: 'existing_user',
      password: 'existing_passwrod',
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
});
