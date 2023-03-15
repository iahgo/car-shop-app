import IMotorcycle from '../Interfaces/IMotorcycle';
import IHttpResponse from '../Interfaces/IHttpResponse';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';
import { badRequest } from '../utils/BadResponses';

export default class MotorcycleService {
  private motorcycleOdm: MotorcycleODM;

  constructor() {
    this.motorcycleOdm = new MotorcycleODM();
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle | null {
    if (motorcycle) {
      const newMotorcycle = new Motorcycle(motorcycle);
      return newMotorcycle;
    }

    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleOdm.create(motorcycle);

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll(): Promise<Motorcycle[]> {
    const motorcycles = await this.motorcycleOdm.findAll();

    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle)) as Motorcycle[];
  }

  public async findById(id: string): Promise<IHttpResponse<Motorcycle | string>> {
    const motorcycle = await this.motorcycleOdm.findById(id);

    if (motorcycle === null) return badRequest('Motorcycle not found');

    const instaceMotorcycle = this.createMotorcycleDomain(motorcycle);

    return {
      statusCode: 200,
      body: instaceMotorcycle as Motorcycle,
    };
  }

  public async updateMotorcycle(
    id: string,
    motorcycle: IMotorcycle,
  ): Promise<IHttpResponse<Motorcycle | string>> {
    const updatedMotorcycle = await this.motorcycleOdm.update(id, motorcycle);

    if (updatedMotorcycle === null) return badRequest('Motorcycle not found');

    const instaceMotorcycle = this.createMotorcycleDomain(updatedMotorcycle);

    return {
      statusCode: 200,
      body: instaceMotorcycle as Motorcycle,
    };
  }
}