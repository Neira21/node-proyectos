import express from 'express';
import {employessRouter} from './routes/employees.js';
import {routerIndex} from './routes/index.js';


import { PORT } from './config.js'

const app = express();

app.use(express.json());

app.use('/employees', employessRouter);
app.use(routerIndex);

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})