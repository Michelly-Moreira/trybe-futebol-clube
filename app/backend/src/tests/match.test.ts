import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/MatchModel';
// import { mockValidUser, mockInvalidUser, failureMessage, invalidDataMessage } from './mocks/UserMock';
import Auth from '../database/utils/Auth';

chai.use(chaiHttp);

const { expect } = chai;

// TDD: red => green => refactor


describe('Testes da service Match', () => {
  // arrange => dado um contexto
  // act => ao executar um código
  // assertion => espero um resultado específico
  it('Seu sub-teste', () => {
    expect(false).to.be.equal(true);
  });
});
