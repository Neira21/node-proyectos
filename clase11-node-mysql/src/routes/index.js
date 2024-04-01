import { Router } from "express";
import db from '../database/db.js';

const routerIndex = Router();

routerIndex.get('/ping', async (req, res) => {
  const [results, ] = 
    await db.query(
      'SELECT (BIN_TO_UUID(id)) as "idEmploye" , name, salary FROM employee'
    )  
  res.json(results);
})

export { routerIndex };