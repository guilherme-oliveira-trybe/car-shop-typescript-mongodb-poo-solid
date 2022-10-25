import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';

const route = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const MOTORCYCLES = '/motorcycles';

route.post(MOTORCYCLES, (req, res) => motorcycleController.create(req, res));
route.get(`${MOTORCYCLES}/:id`, (req, res) => motorcycleController.readOne(req, res));
route.get(MOTORCYCLES, (req, res) => motorcycleController.read(req, res));
route.put(`${MOTORCYCLES}/:id`, (req, res) => motorcycleController.update(req, res));
route.delete(`${MOTORCYCLES}/:id`, (req, res) => motorcycleController.delete(req, res));

export default route;