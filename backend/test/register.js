const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/POST user', () => {
    it('it should create new user', (done) => {
    let user = {
        login: "new_user",
        password: "new_passwrod",
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
        let user = {
            login: "existing_user",
            password: "existing_passwrod",
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
