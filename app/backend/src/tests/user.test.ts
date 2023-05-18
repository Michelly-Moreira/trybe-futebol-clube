import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { mockValidUser, mockInvalidUser, failureMessage, invalidDataMessage, withoutToken, invalidToken } from './mocks/UserMock';
import Auth from '../database/utils/Auth';

chai.use(chaiHttp);

const { expect } = chai;

// TDD: red => green => refactor


describe('Testes da Service User', () => {
  // arrange => dado um contexto
  // act => ao executar um código
  // assertion => espero um resultado específico
  afterEach(() => {
    sinon.restore()
  })

  describe('signin', () => {
    describe('Se a requisição não tem campo email', () => {
      it('não será possível fazer login', async () => {
        const response = await chai.request(app)
        .post('/login')
        .send({
          password: 'secret_user',
        })
        expect(response.status).to.be.equal(400);
        expect(response.body.message).to.be.equal(failureMessage)
      });
    });
    describe('Se a requisição não tem campo senha', () => {
      it('não será possível fazer login', async () => {
        const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
        })
        expect(response.status).to.be.equal(400);
        expect(response.body.message).to.be.equal(failureMessage)
      });
    });
    describe('Se a requisição não tem email válido', () => {
      it('não será possível fazer login', async () => {
        const response = await chai.request(app)
        .post('/login')
        .send({
          email: '@xablau.com',
          password: 'secret_user',
        })
        expect(response.status).to.be.equal(401);
        expect(response.body.message).to.be.equal(invalidDataMessage)
      });
    });
    describe('Se a requisição não tem senha válida', () => {
      it('não será possível fazer login', async () => {
        const response = await chai.request(app)
        .post('/login')
        .send({
          email: '@xablau.com',
          password: 'mi',
        })
        expect(response.status).to.be.equal(401);
        expect(response.body.message).to.be.equal(invalidDataMessage)
      });
    });
    describe('Se a requisição recebe um email que não foi cadastrado anteriormente', () => {
      it('não será possível fazer login', async () => {
        sinon.stub(UserModel, 'findOne')
        .resolves(mockInvalidUser as unknown as UserModel);

        const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'michelly.daiana@hotmail.com',
          password: 'secret_user',
        })
        expect(response.status).to.be.equal(401);
        expect(response.body.message).to.be.equal(invalidDataMessage)
      });
    });
      /* describe('Se a requisição recebe campos válidos', () => {
      it('é possível fazer login', async () => {
        sinon.stub(UserModel, 'findOne')
        .resolves(mockValidUser as unknown as UserModel);

        const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        })
        expect(response.status).to.be.equal(200);
        expect(response.body.token).not.to.be.empty;
      });
    }); */
  });
  describe('getRole', () => {
    describe('Se a requisição não recebe um token', () => {
      it('não é possível retornar os dados corretos', async () => {
        const response = await chai.request(app)
        .get('/login/role')
       
        expect(response.status).to.be.equal(400);
        expect(response.body.message).to.be.equal(withoutToken)
      });
    });
    describe('Se a requisição recebe um token inválido', () => {
      it('não é possível retornar os dados corretos', async () => {
        const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'qualquersenha');
       
        expect(response.status).to.be.equal(400);
        expect(response.body.message).to.be.equal(invalidToken)
      });
    });
  });
});
