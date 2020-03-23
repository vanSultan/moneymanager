const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();

describe('/api/auth/login', () => {
  it('it should return an error for not existing user', (done) => {
    const user = {
      login: 'not existing user',
      password: 'some valid password',
    };
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
});

chai.use(chaiHttp);
