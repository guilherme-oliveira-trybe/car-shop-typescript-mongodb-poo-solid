import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, allCarsMock } from '../../mocks/carMocks';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').onCall(0).resolves(allCarsMock).onCall(1).resolves([]);
    sinon.stub(Model, 'findOne').onCall(0).resolves(carMockWithId).onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    })
  });

  describe('searching all cars', () => {
    it('successfully found', async () => {
      const allCarsFound = await carService.read();

      expect(allCarsFound).to.be.deep.equal(allCarsFound);
    })

    it('if dont have cars, returns an empty list', async () => {
      const allCarsFound = await carService.read();

      expect(allCarsFound).to.be.deep.equal([]);
    })
  })

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carService.readOne(carMockWithId._id);

      expect(carFound).to.be.deep.equal(carMockWithId);
    })

    it('_id not found', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  })

});