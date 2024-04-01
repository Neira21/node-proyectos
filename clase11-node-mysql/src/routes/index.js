import { Router } from "express";
import db from '../database/db.js';

const routerIndex = Router();

routerIndex.get('/ping', async (req, res) => {
  const [results, ] = 
    await db.query(
      'SELECT "pong" as "res";'
    )
  res.json(results);
})

export { routerIndex };