/* import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { mockLeaderBoardHome, mockLeaderBoardAway } from './mocks/LeaderBoardMock';
import TeamModel from '../database/models/TeamModel';
import { mockAllTeams } from './mocks/TeamMock';

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
        .resolves(mockLeaderBoardHome as unknown as MatchModel[]);

        sinon.stub(TeamModel, 'findAll')
        .resolves(mockLeaderBoardHome as unknown as TeamModel[])

        const response = await chai.request(app)
        .get('/leaderBoard/home')
        // .send({})

        expect(response.status).to.be.equal(200);
        // expect(response.body).to.be.deep.equal(mockLeaderBoardHome)
      });
    });
  });

  describe('endpoint /leaderBoard/away', () => {
    describe('Se através do método get', () => {
      it('é possível retornar todas as informações de performance dos times visitantes', async () => {
        sinon.stub(MatchModel, 'findAll')
        .resolves(mockTimesNotInProgress as unknown as MatchModel[]);

        sinon.stub(TeamModel, 'findAll')
        .resolves(mockAllTeams as unknown as TeamModel[])

        const response = await chai.request(app)
        .get('/leaderBoard/away')
        // .send({})

        expect(response.status).to.be.equal(200);
        // expect(response.body).to.be.deep.equal(mockLeaderBoardHome);
      });
    });
  });
});
 */