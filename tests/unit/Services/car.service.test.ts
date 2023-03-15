import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/car.service';
import Car from '../../../src/Domains/Car';

describe('Teste da camada carService', function () {
  describe('Testes da API', function () {
    it('Testa o createCar', async function () {
      const carInput: ICar = {
        id: '6410bd34f5d252fbc05cef92',
        model: 'Golf',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        doorsQty: 4,
        seatsQty: 5,
      };

      const carOutput: Car = new Car(carInput);

      sinon.stub(Model, 'create').resolves(carOutput);

      const service = new CarService();
      const result = await service.createCar(carInput);

      expect(result).to.be.deep.equal(carOutput);
    });

    it('Testa findAll', async function () {
      const carInput: ICar[] = [{
        id: '6410bd34f5d252fbc05cef92',
        model: 'Golf',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        doorsQty: 4,
        seatsQty: 5,
      }];

      sinon.stub(Model, 'find').resolves(carInput);

      const service = new CarService();
      const result = await service.findAll();

      expect(result).to.be.deep.equal(carInput);
    });

    it('Testa findById', async function () {
      const carInput: ICar = {
        id: '6410bd34f5d252fbc05cef92',
        model: 'Golf',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        doorsQty: 4,
        seatsQty: 5,
      };

      const carOutput: Car = new Car(carInput);

      sinon.stub(Model, 'findById').resolves(carOutput);

      const service = new CarService();
      const result = await service.findById(carInput.id as string);

      expect(result.body).to.be.deep.equal(carOutput);
    });

    it('Testa update', async function () {
      const carInput: ICar = {
        model: 'Golf',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        doorsQty: 4,
        seatsQty: 5,
      };

      const carOutput: Car = new Car(carInput);

      sinon.stub(Model, 'updateOne').resolves();
      sinon.stub(Model, 'findById').resolves(carOutput);

      const service = new CarService();
      const result = await service.updateCar(carInput.id as string, carInput);

      expect(result.body).to.be.deep.equal(carOutput);
    });
  });

  describe('Testa erros na API', function () {
    it('Testa erro no findById, id não encontrado', async function () {
      const carInput: ICar = {
        id: '6410bd34f5d252fbc05cef92',
        model: 'Golf',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        doorsQty: 4,
        seatsQty: 5,
      };

      sinon.stub(Model, 'findById').resolves(null);

      const service = new CarService();
      const result = await service.findById(carInput.id as string);

      expect(result.body).to.be.deep.equal('Car not found');
    });

    it('Testa erro no update, id not found', async function () {
      const carInput: ICar = {
        model: 'Golf',
        year: 2018,
        color: 'Blue',
        status: true,
        buyValue: 65.500,
        doorsQty: 4,
        seatsQty: 5,
      };

      sinon.stub(Model, 'updateOne').resolves();
      sinon.stub(Model, 'findById').resolves(null);

      const service = new CarService();
      const result = await service.updateCar(carInput.id as string, carInput);

      expect(result.body).to.be.deep.equal('Car not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});