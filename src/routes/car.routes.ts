import { Router } from 'express';
import CarsController from '../Controllers/cars.controllers';

const carRoutes = Router();

carRoutes.post('/cars', (req, res, next) => new CarsController(req, res, next).create());
carRoutes.get('/cars', (req, res, next) => new CarsController(req, res, next).findAll());

carRoutes.get('/cars/:id', (req, res, next) => new CarsController(req, res, next).findById());
carRoutes.put('/cars/:id', (req, res, next) => new CarsController(req, res, next).updateCar());

export default carRoutes;