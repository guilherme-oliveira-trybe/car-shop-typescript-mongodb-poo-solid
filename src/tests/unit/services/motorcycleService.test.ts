import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, 
  allMotorcyclesMock, changeMotorcycleMock, changedMotorcycleMockWithId, deleteMotorcycleMockWithId } from '../../mocks/motorcycleMocks';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').onCall(0).resolves(allMotorcyclesMock).onCall(1).resolves([]);
    sinon.stub(Model, 'findOne').onCall(0).resolves(motorcycleMockWithId).onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate').onCall(0).resolves(changedMotorcycleMockWithId).onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndDelete').onCall(0).resolves(deleteMotorcycleMockWithId).onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      const motorcycleCreated = await motorcycleService.create(motorcycleMock);
      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await motorcycleService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    })
  });

  describe('searching all motorcycles', () => {
    it('successfully found', async () => {
      const allMotorcyclesFound = await motorcycleService.read();

      expect(allMotorcyclesFound).to.be.deep.equal(allMotorcyclesMock);
    })

    it('if dont have motorcycles, returns an empty list', async () => {
      const allMotorcyclesFound = await motorcycleService.read();

      expect(allMotorcyclesFound).to.be.deep.equal([]);
    })
  })

  describe('searching a motorcycle', () => {
    it('successfully found', async () => {
      const motorcycleFound = await motorcycleService.readOne(motorcycleMockWithId._id);

      expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
    })

    it('_id not found', async () => {
      let error;
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  })

  describe('changing a motorcycle', () => {
    it('successfully changed', async () => {
      const motorcycleChanged = await motorcycleService.update(changedMotorcycleMockWithId._id, changeMotorcycleMock);

      expect(motorcycleChanged).to.be.deep.equal(changedMotorcycleMockWithId);
    })

    it('_id not found', async () => {
      let error;
      try {
        await motorcycleService.update(changedMotorcycleMockWithId._id, changeMotorcycleMock);
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })

    it('Failure', async () => {
      let error;
      try {
        await motorcycleService.update(changedMotorcycleMockWithId._id,{});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    })
  })

  describe('delete a motorcycle', () => {
    it('successfully delete', async () => {
      const motorcycleDeleted = await motorcycleService.delete(deleteMotorcycleMockWithId._id);

      expect(motorcycleDeleted).to.be.deep.equal(deleteMotorcycleMockWithId);
    })

    it('_id not found', async () => {
      let error;
      try {
        await motorcycleService.delete(changedMotorcycleMockWithId._id);
      } catch (err: any) {
        error = err.message
      }

      expect(error).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  })
});