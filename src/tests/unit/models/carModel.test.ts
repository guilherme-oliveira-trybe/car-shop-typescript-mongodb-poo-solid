import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
import { carMock, carMockWithId, allCarsMock } from '../../mocks/carMocks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').onCall(0).resolves(allCarsMock).onCall(1).resolves([]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching all cars', () => {
    it('successfully found', async () => {
      const allCarsFound = await carModel.read();

      expect(allCarsFound).to.be.deep.equal(allCarsFound);
    })

    it('if dont have cars, returns an empty list', async () => {
      const allCarsFound = await carModel.read();

      expect(allCarsFound).to.be.deep.equal([]);
    })
  })

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carModel.readOne(carMockWithId._id);

      expect(carFound).to.be.deep.equal(carMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      try {
        await carModel.readOne('123ERRADO');
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  })

});