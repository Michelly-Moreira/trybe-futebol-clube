import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Auth from '../database/utils/Auth';
import MatchModel from '../database/models/MatchModel';
import { mockAllMatches, mockMatchesNotInProgress, mockMatchesInProgress, mockMatchCreated, dataCreateMatch } from './mocks/MatchMock';
import { invalidToken, withoutToken } from './mocks/UserMock';

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

    describe('filterMatch', () => {
      it('retorna uma lista de partidas finalizadas', async() => {
        
          sinon.stub(MatchModel, 'findAll')
          .resolves(mockAllMatches as unknown as MatchModel[]);
  
        const response = await chai.request(app)
        .get('/matches?inProgress=false');
  
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockMatchesNotInProgress);
      });
      it('retorna uma lista de partidas em andamento', async() => {
        
          sinon.stub(MatchModel, 'findAll')
          .resolves(mockAllMatches as unknown as MatchModel[]);
  
        const response = await chai.request(app)
        .get('/matches?inProgress=true');
  
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockMatchesInProgress);
      });
    });

    describe('finishMatch', () => {
      describe('Se a requisição não recebe um token', () => {
        it('não é possível retornar os dados corretos', async() => {
           
          const response = await chai.request(app)
          .patch('/matches/41/finish');
    
          expect(response.status).to.be.equal(401);
          expect(response.body.message).to.be.deep.equal(withoutToken);
        });
      });
    
      describe('Se a requisição não recebe um token válido', () => {
        it('não é possível retornar os dados corretos', async() => {
           
          const response = await chai.request(app)
          .patch('/matches/41/finish')
          .set('Authorization', 'qualquersenha');
    
          expect(response.status).to.be.equal(401);
          expect(response.body.message).to.be.deep.equal(invalidToken);
        });
      });
    
      describe('Se a requisição recebe um token válido', () => {
        it('é possível retornar a partida finalizada', async() => {

          sinon.stub(MatchModel, 'update')
          .resolves([1]);

          const token = Auth.generateToken({
            email: 'admin@admin.com',
            role: 'admin',
          })
           
          const response = await chai.request(app)
          .patch('/matches/41/finish')
          .set('Authorization', token);
    
          expect(response.status).to.be.equal(200);
          expect(response.body).to.be.deep.equal({ message: 'Finished' });
        });
      });
    });

    describe('create', () => {
      describe('Se a requisição recebe um token válido', () => {
        it('é possível retornar os dados da partida criada', async() => {

          sinon.stub(MatchModel, 'create')
          .resolves(mockMatchCreated as unknown as MatchModel);

          const token = Auth.generateToken({
            email: 'admin@admin.com',
            role: 'admin',
          })
           
          const response = await chai.request(app)
          .post('/matches')
          .set('Authorization', token)
          .send(dataCreateMatch);
    
          expect(response.status).to.be.equal(201);
          expect(response.body).to.be.deep.equal(mockMatchCreated);
        });
      });
    });
  }); 
});
