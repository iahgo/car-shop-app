import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import CarsService from '../Services/car.service';

export default class CarsController {
  private carsService: CarsService;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carsService = new CarsService();
  }

  public async create() {
    const newCar = await this.carsService.createCar(this.req.body);
    return this.res.status(201).json(newCar);
  }
  
  public async findAll() {
    const cars = await this.carsService.findAll();
    return this.res.status(200).json(cars);
  }

  public async findById() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });

    const { statusCode, body } = await this.carsService.findById(id);

    if (statusCode === 404) {
      return this.res.status(statusCode).json({ message: body });
    }

    return this.res.status(statusCode).json(body);
  }

  public async updateCar() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });

    const { statusCode, body } = await this.carsService.updateCar(id, this.req.body);

    if (statusCode === 404) return this.res.status(statusCode).json({ message: body });

    return this.res.status(statusCode).json(body);
  }
}