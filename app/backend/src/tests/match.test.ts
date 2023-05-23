import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/MatchModel';
// import { mockValidUser, mockInvalidUser, failureMessage, invalidDataMessage } from './mocks/UserMock';
import Auth from '../database/utils/Auth';
import MatchModel from '../database/models/MatchModel';
import { mockAllMatches } from './mocks/MatchMock';

chai.use(chaiHttp);

const { expect } = chai;

// TDD: red => green => refactor


describe('Testes da service Match', () => {
  // arrange => dado um contexto
  // act => ao executar um código
  // assertion => espero um resultado específico
  describe('Dado um banco populado', () => {
    it('retorna uma lista com todas as partidas', async() => {
      sinon.stub(MatchModel, 'findAll')
      .resolves(mockAllMatches as unknown as MatchModel[]);

      const response = await chai.request(app)
      .get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllMatches);
    });
  })
  
});
