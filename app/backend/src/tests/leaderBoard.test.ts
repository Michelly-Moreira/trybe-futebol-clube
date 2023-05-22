import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

// TDD: red => green => refactor


describe('Testes da LeaderBoard', () => {
  // arrange => dado um contexto
  // act => ao executar um código
  // assertion => espero um resultado específico
  afterEach(() => {
    sinon.restore()
  })

  describe('endpoint /leaderBoard/home', () => {
    describe('Se através do método get', () => {
      it('é possível retornar todas as informações de performance dos times da casa', async () => {
        sinon.stub(MatchModel, 'findAll')
        .resolves();

        const response = await chai.request(app)
        .post('/leaderBoard/home')
        // .send({})

        expect(response.status).to.be.equal(200);
      });
    });
  });

  describe('endpoint /leaderBoard/away', () => {
    describe('Se através do método get', () => {
      it('é possível retornar todas as informações de performance dos times visitantes', async () => {
        sinon.stub(MatchModel, 'findAll')
        .resolves();

        const response = await chai.request(app)
        .post('/leaderBoard/away')
        // .send({})

        expect(response.status).to.be.equal(200);
      });
    });
  });
});
