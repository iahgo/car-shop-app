import express from 'express';
import carRoutes from './routes/car.routes';
// import motorcyclesRoutes from './routes/motorcycles.routes';

const app = express();
app.use(express.json());
app.use(carRoutes);
// app.use(motorcyclesRoutes);

export default app;
