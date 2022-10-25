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
    model: 'Celta',
    year: 2015,
    color: 'Silver',
    status: true,
    buyValue: 30000,
    doorsQty: 2,
    seatsQty: 5,
  },
  {
    _id: '73cf1fc6498565d94eba52cd',
    model: 'Ônix',
    year: 2019,
    color: 'gray',
    status: true,
    buyValue: 45000,
    doorsQty: 2,
    seatsQty: 5,
  },
  {
    _id: '84cf1fc6498565d94eba52cd',
    model: 'Prisma',
    year: 2016,
    color: 'Red',
    status: true,
    buyValue: 35000,
    doorsQty: 2,
    seatsQty: 5,
  },
];

const changeCarMock: ICar = {
  model: 'Peugeot',
  year: 2012,
  color: 'Dark Gray',
  status: true,
  buyValue: 15000,
  doorsQty: 2,
  seatsQty: 5,
}

const changedCarMockWithId: ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Peugeot',
  year: 2012,
  color: 'Dark Gray',
  status: true,
  buyValue: 15000,
  doorsQty: 2,
  seatsQty: 5,
}

export { carMock, carMockWithId, allCarsMock, changeCarMock, changedCarMockWithId };