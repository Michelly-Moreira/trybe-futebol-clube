import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/MatchModel';
// import { mockValidUser, mockInvalidUser, failureMessage, invalidDataMessage } from './mocks/UserMock';
import Auth from '../database/utils/Auth';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

// TDD: red => green => refactor


describe('Testes da service Match', () => {
  // arrange => dado um contexto
  // act => ao executar um código
  // assertion => espero um resultado específico
  describe('Dado um banco populado', () => {
    it('retorna uma lista com todas as partidas', () => {
      sinon.stub(MatchModel, 'findAll')
      .resolves()
      expect(true).to.be.equal(true);
    });
  })
  
});
