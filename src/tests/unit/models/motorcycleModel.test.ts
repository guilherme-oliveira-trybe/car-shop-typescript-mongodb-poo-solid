import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, 
  allMotorcyclesMock, changeMotorcycleMock, changedMotorcycleMockWithId, deleteMotorcycleMockWithId } from '../../mocks/motorcycleMocks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').onCall(0).resolves(allMotorcyclesMock).onCall(1).resolves([]);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(changedMotorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(deleteMotorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('searching all motorcycles', () => {
    it('successfully found', async () => {
      const allMotorcycleFound = await motorcycleModel.read();

      expect(allMotorcycleFound).to.be.deep.equal(allMotorcyclesMock);
    })

    it('if dont have motorcycles, returns an empty list', async () => {
      const allMotorcycleFound = await motorcycleModel.read();

      expect(allMotorcycleFound).to.be.deep.equal([]);
    })
  })

  describe('searching a motorcycle', () => {
    it('successfully found', async () => {
      const motorcycleFound = await motorcycleModel.readOne(motorcycleMockWithId._id);

      expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      try {
        await motorcycleModel.readOne('123ERRADO');
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  })

  describe('changing a motorcycle', () => {
    it('successfully changed', async () => {
      const motorcycleChanged = await motorcycleModel.update(changedMotorcycleMockWithId._id, changeMotorcycleMock);

      expect(motorcycleChanged).to.be.deep.equal(changedMotorcycleMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      try {
        await motorcycleModel.update('123ERRADO', changeMotorcycleMock);
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  })

  describe('delete a motorcycle', () => {
    it('successfully delete', async () => {
      const motorcycleDeleted = await motorcycleModel.delete(deleteMotorcycleMockWithId._id);

      expect(motorcycleDeleted).to.be.deep.equal(deleteMotorcycleMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      try {
        await motorcycleModel.delete('123ERRADO');
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  })

});