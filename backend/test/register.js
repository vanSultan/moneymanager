const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();

chai.use(chaiHttp);

const defaultUser = {
  login: 'default_user',
  password: 'default_password',
};

const newUser = {
  login: 'register_user',
  password: 'register_password',
};

const wrongPasswordUser = {
  login: 'register_user_password',
  password: '',
};

describe('/api/auth/register', () => {
  it('Создание нового пользователя', (done) => {
    chai.request(server)
      .post('/api/auth/register/')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Пользователь создан');
        done();
      });
  });
  it('Создание пользовтеля с совпадающим логином', (done) => {
    chai.request(server)
      .post('/api/auth/register/')
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.equal('Такой пользователь уже существует');
        done();
      });
  });
  it('Создание пользователя с неподходящим паролем', (done) => {
    chai.request(server)
      .post('/api/auth/register/')
      .send(wrongPasswordUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.message.should.be.equal('Некорректные данные при регистрации');
        done();
      });
  });
});
