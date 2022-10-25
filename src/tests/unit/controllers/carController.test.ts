import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { carMock, carMockWithId, allCarsMock, changeCarMock, changedCarMockWithId } from '../../mocks/carMocks';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'read').onCall(0).resolves(allCarsMock).onCall(1).resolves([]);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(changedCarMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('searching all cars', () => {
    it('successfully found', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCarsMock)).to.be.true;
    })

    it('if dont have cars, returns an empty list', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([])).to.be.true;
    })
  })

  describe('searching a car', () => {
    it('successfully found', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('changing a car', () => {
    it('successfully changed', async () => {
      req.body = changeCarMock;
      req.params = { id: changedCarMockWithId._id };
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(changedCarMockWithId)).to.be.true;
    })
  })

});