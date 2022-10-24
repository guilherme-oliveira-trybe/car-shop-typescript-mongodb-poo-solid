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

const carMockWithId: ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Chevrolet',
  year: 2015,
  color: 'Prata',
  status: true,
  buyValue: 30000,
  doorsQty: 2,
  seatsQty: 5,
}

const allCarsMock: ICar[] & { _id: string }[] = [
  {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'Chevrolet',
    year: 2015,
    color: 'Prata',
    status: true,
    buyValue: 30000,
    doorsQty: 2,
    seatsQty: 5,
  },
  {
    _id: '73cf1fc6498565d94eba52cd',
    model: 'Chevrolet',
    year: 2019,
    color: 'Ônix',
    status: true,
    buyValue: 45000,
    doorsQty: 2,
    seatsQty: 5,
  },
  {
    _id: '84cf1fc6498565d94eba52cd',
    model: 'Prisma',
    year: 2016,
    color: 'Prata',
    status: true,
    buyValue: 35000,
    doorsQty: 2,
    seatsQty: 5,
  },
];

export { carMock, carMockWithId, allCarsMock };