import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { mockValidUser, mockInvalidUser, failureMessage, invalidDataMessage } from './mocks/UserMock';
import Auth from '../database/utils/Auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /login', () => {
  it('Seu sub-teste', () => {
    expect(false).to.be.equal(true);
  });
});
