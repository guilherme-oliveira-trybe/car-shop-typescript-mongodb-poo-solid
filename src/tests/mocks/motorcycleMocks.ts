import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motorcycleMock: IMotorcycle = {
  model: 'CG 150',
  year: 2015,
  color: 'Red',
  status: true,
  buyValue: 17000,
  category: 'Street',
  engineCapacity: 150,
};

const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'CG 150',
  year: 2015,
  color: 'Red',
  status: true,
  buyValue: 17000,
  category: 'Street',
  engineCapacity: 150,
}

const allMotorcyclesMock: IMotorcycle[] & { _id: string }[] = [
  {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'CG 150',
    year: 2015,
    color: 'Red',
    status: true,
    buyValue: 17000,
    category: 'Street',
    engineCapacity: 150,
  },
  {
    _id: '73cf1fc6498565d94eba52cd',
    model: 'Kawasaki Ninja',
    year: 2019,
    color: 'gray',
    status: true,
    buyValue: 45000,
    category: 'Custom',
    engineCapacity: 2400,
  },
  {
    _id: '84cf1fc6498565d94eba52cd',
    model: 'CB 1000',
    year: 2016,
    color: 'Red',
    status: true,
    buyValue: 35000,
    category: 'Street',
    engineCapacity: 1000,
  },
];

const changeMotorcycleMock: IMotorcycle = {
  model: 'CG 160',
  year: 2015,
  color: 'Red',
  status: true,
  buyValue: 17000,
  category: 'Street',
  engineCapacity: 160,
}

const changedMotorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'CG 160',
  year: 2015,
  color: 'Red',
  status: true,
  buyValue: 17000,
  category: 'Street',
  engineCapacity: 160,
}

const deleteMotorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'CG 150',
  year: 2015,
  color: 'Red',
  status: true,
  buyValue: 17000,
  category: 'Street',
  engineCapacity: 150,
}

export { motorcycleMock, 
  motorcycleMockWithId, 
  allMotorcyclesMock, 
  changeMotorcycleMock, 
  changedMotorcycleMockWithId, 
  deleteMotorcycleMockWithId,  
};