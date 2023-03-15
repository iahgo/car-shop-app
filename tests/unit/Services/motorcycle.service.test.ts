import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/motorcycle.service';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Teste da camada MotorcycleService', function () {
  describe('Testes da API', function () {
    it('Testa o createCar', async function () {
      const motorcycleInput: IMotorcycle = {
        id: '6410bd34f5d252fbc05cef92',
        model: 'Honda Hornet',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        category: 'Street',
        engineCapacity: 600,
      };

      const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);

      sinon.stub(Model, 'create').resolves(motorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.createMotorcycle(motorcycleInput);

      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it('Testa findAll', async function () {
      const motorcycleInput: IMotorcycle[] = [{
        id: '6410bd34f5d252fbc05cef92',
        model: 'Honda 600f Hornet',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        category: 'Street',
        engineCapacity: 600,
      }];

      sinon.stub(Model, 'find').resolves(motorcycleInput);

      const service = new MotorcycleService();
      const result = await service.findAll();

      expect(result).to.be.deep.equal(motorcycleInput);
    });

    it('Testa findById', async function () {
      const motorcycleInput: IMotorcycle = {
        id: '6410bd34f5d252fbc05cef92',
        model: 'Honda Cb 600f ',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        category: 'Street',
        engineCapacity: 600,
      };

      const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);

      sinon.stub(Model, 'findById').resolves(motorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.findById(motorcycleInput.id as string);

      expect(result.body).to.be.deep.equal(motorcycleOutput);
    });

    it('Testa update', async function () {
      const motorcycleInput: IMotorcycle = {
        model: 'Cb 600f Hornet',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        category: 'Street',
        engineCapacity: 600, 
      };

      const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);

      sinon.stub(Model, 'updateOne').resolves();
      sinon.stub(Model, 'findById').resolves(motorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.updateMotorcycle(motorcycleInput.id as string, motorcycleInput);

      expect(result.body).to.be.deep.equal(motorcycleOutput);
    });
  });

  describe('Testa erros na API', function () {
    it('Testa erro no findById, id não encontrado', async function () {
      const motorcycleInput: IMotorcycle = {
        id: '6410bd34f5d252fbc05cef92',
        model: 'Honda Cb 600f Hornet',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'findById').resolves(null);

      const service = new MotorcycleService();
      const result = await service.findById(motorcycleInput.id as string);

      expect(result.body).to.be.deep.equal('Motorcycle not found');
    });

    it('Testa erro no update, id not found', async function () {
      const motorcycleInput: IMotorcycle = {
        model: 'Honda Cb 600f Hornet',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'updateOne').resolves();
      sinon.stub(Model, 'findById').resolves(null);

      const service = new MotorcycleService();
      const result = await service.updateMotorcycle(motorcycleInput.id as string, motorcycleInput);

      expect(result.body).to.be.deep.equal('Motorcycle not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});