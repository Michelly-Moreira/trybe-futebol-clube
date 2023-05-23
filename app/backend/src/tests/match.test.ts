import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Auth from '../database/utils/Auth';
import MatchModel from '../database/models/MatchModel';
import { mockAllMatches, mockMatchesNotInProgress, mockMatchesInProgress } from './mocks/MatchMock';
import { withoutToken } from './mocks/UserMock';

chai.use(chaiHttp);

const { expect } = chai;

// TDD: red => green => refactor


describe('Testes da service Match', () => {
  // arrange => dado um contexto
  // act => ao executar um código
  // assertion => espero um resultado específico
  afterEach(() => {
    sinon.restore()
  })

  describe('Dado um banco populado', () => {
    describe('getAllMatches', () => {
      it('retorna uma lista com todas as partidas', async() => {
        
          sinon.stub(MatchModel, 'findAll')
          .resolves(mockAllMatches as unknown as MatchModel[]);
  
        const response = await chai.request(app)
        .get('/matches');
  
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockAllMatches);
      });
    });
    describe('filterMatch', async() => {
      it('retorna uma lista de partidas finalizadas', async() => {
        
          sinon.stub(MatchModel, 'findAll')
          .resolves(mockMatchesNotInProgress as unknown as MatchModel[]);
  
        const response = await chai.request(app)
        .get('/matches?inProgress=false');
  
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockMatchesNotInProgress);
      });
    });
    describe('filterMatch', async() => {
      it('retorna uma lista de partidas em andamento', async() => {
        beforeEach(() => {
          sinon.stub(MatchModel, 'findAll')
          .resolves(mockMatchesInProgress as unknown as MatchModel[]);
        });
  
        const response = await chai.request(app)
        .get('/matches?inProgress=true');
  
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockMatchesInProgress);
      });
    });
    describe('finishMatch', async() => {
      describe('Se a requisição não recebe um token', () => {
        it('não é possível retornar os dados corretos', async() => {
           
          const response = await chai.request(app)
          .patch('/matches/41/finish');
    
          expect(response.status).to.be.equal(401);
          expect(response.body.message).to.be.deep.equal(withoutToken);
        });
      });
    });
  }); 
});
