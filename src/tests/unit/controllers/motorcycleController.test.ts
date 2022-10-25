import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import MotorcycleController from '../../../controllers/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, 
  allMotorcyclesMock, changeMotorcycleMock, changedMotorcycleMockWithId, deleteMotorcycleMockWithId } from '../../mocks/motorcycleMocks';

describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMock);
    sinon.stub(motorcycleService, 'read').onCall(0).resolves(allMotorcyclesMock).onCall(1).resolves([]);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'update').resolves(changedMotorcycleMockWithId);
    sinon.stub(motorcycleService, 'delete').resolves(deleteMotorcycleMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });

  describe('searching all motorcycles', () => {
    it('successfully found', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allMotorcyclesMock)).to.be.true;
    })

    it('if dont have motorcycles, returns an empty list', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([])).to.be.true;
    })
  })

  describe('searching a motorcycle', () => {
    it('successfully found', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    })
  })

  describe('changing a motorcycle', () => {
    it('successfully changed', async () => {
      req.body = changeMotorcycleMock;
      req.params = { id: changedMotorcycleMockWithId._id };
      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(changedMotorcycleMockWithId)).to.be.true;
    })
  })

  describe('delete a motorcycle', () => {
    it('successfully delete', async () => {
      req.params = { id: deleteMotorcycleMockWithId._id };
      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.end as sinon.SinonStub).calledWith()).to.be.true;
    })
  })

});