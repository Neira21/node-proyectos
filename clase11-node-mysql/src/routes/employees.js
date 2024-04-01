import Router from 'express';
import EmployeesController from '../controllers/employees.js';


export const employessRouter = Router();

employessRouter
    .get('/', EmployeesController.getAllData)
    .post('/', EmployeesController.createData)
    .get('/:id', EmployeesController.getByIdData)
    .patch('/:id', EmployeesController.updateData)
    .delete('/:id', EmployeesController.deleteData)
