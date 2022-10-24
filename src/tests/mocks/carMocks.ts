import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: 'Chevrolet',
  year: 2015,
  color: 'Prata',
  status: true,
  buyValue: 30000,
  doorsQty: 2,
  seatsQty: 5,
};

const carMockWithId: ICar & { _id: string} = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Chevrolet',
  year: 2015,
  color: 'Prata',
  status: true,
  buyValue: 30000,
  doorsQty: 2,
  seatsQty: 5,
}

export { carMock, carMockWithId };