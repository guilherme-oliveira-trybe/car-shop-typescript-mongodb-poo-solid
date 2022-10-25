import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
import { carMock, carMockWithId, allCarsMock, changeCarMock, changedCarMockWithId, deleteCarMockWithId } from '../../mocks/carMocks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').onCall(0).resolves(allCarsMock).onCall(1).resolves([]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(changedCarMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(deleteCarMockWithId);
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

      expect(allCarsFound).to.be.deep.equal(allCarsMock);
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

  describe('changing a car', () => {
    it('successfully changed', async () => {
      const carChanged = await carModel.update(changedCarMockWithId._id, changeCarMock);

      expect(carChanged).to.be.deep.equal(changedCarMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      try {
        await carModel.update('123ERRADO', changeCarMock);
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  })

  describe('delete a car', () => {
    it('successfully delete', async () => {
      const carDeleted = await carModel.delete(deleteCarMockWithId._id);

      expect(carDeleted).to.be.deep.equal(deleteCarMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      try {
        await carModel.delete('123ERRADO');
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  })

});