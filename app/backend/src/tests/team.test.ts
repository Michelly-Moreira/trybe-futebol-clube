import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Auth from '../database/utils/Auth';
import TeamModel from '../database/models/TeamModel';
import { mockAllTeams, mockOneTeam } from './mocks/TeamMock';
import TeamService from '../database/services/TeamService';

chai.use(chaiHttp);

const { expect } = chai;

// TDD: red => green => refactor
// arrange => dado um contexto
// act => ao executar um código
// assertion => espero um resultado específico 

describe('Testes da service Team', () => {

  afterEach(() => {
    sinon.restore()
  })

    describe('findAll', () => {
    describe('Dado um banco populado', () => {
      it('retorna uma lista com todos os times e seus ids', async () => {

        sinon.stub(TeamModel, 'findAll')
        .resolves(mockAllTeams as TeamModel[]);
        
         const response = await chai.request(app)
         .get('/teams')
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockAllTeams)
      });
    }) 
  });
  describe('findById', () => {
    describe('Dado um banco populado', () => {
      it('retorna o time correspondente ao id procurado', async () => {
        
          sinon.stub(TeamModel, 'findOne')
        .resolves(mockOneTeam as unknown as TeamModel);
        
         const response = await chai.request(app)
         .get('/teams/13')
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockOneTeam)
      });
    }) 
  })  
});
