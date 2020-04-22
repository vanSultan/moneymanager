const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

const user = {
  login: 'not existing user',
  password: 'some valid password',
};

describe('/api/auth/login', () => {
  it('it should return an error for not existing user', (done) => {
    chai.request(server)
      .post('/api/auth/login/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Пользователь не найден');
        done();
      });
  });

  it('it should return an error for invalid password', (done) => {
    user.login = 'existing_user';
    user.password = 'not_existing_password';
    chai.request(server)
      .post('/api/auth/login/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.message.should.be.equal('Неверный пароль, попробуйте снова');
        done();
      });
  });

  it('it should login successfully', (done) => {
    user.login = 'new user';
    user.password = 'new password';
    chai.request(server)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });
});
