import express from 'express';
import db from './db/database.js';
import cors from 'cors';
import { BlogRouter } from './routes/BlogRouter.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BlogRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server on port ${port} `);
})