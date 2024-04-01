import express from 'express';
import {employessRouter} from './routes/employees.js';
import {routerIndex} from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/employees', employessRouter);
app.use(routerIndex);

app.get('/', (req, res) => {
  res.send('Hello World');
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})