import { getAllData, getByIdData, createData, updateData, deleteData } from '../services/employees.js';

export default class EmployeesController{

  static async getAllData (req, res) {
    const employees = await getAllData();
    res.json(employees);
  }

  static async getByIdData (req, res) {
    const { id } = req.params;
    const employee = await getByIdData({id});

    if(employee === null) {
      res.status(404).json({message: "Empleado no encontrado"});
    }else{
      res.json(employee);  
    }
  }

  static async createData (req, res) {
    const data = req.body;
    const employee = await createData({data});
    if(employee === null) {
      res.status(404).json({message: "No se pudo crear el empleado"});
    }
    res.json(employee);
  }

  static async updateData (req, res) {
    const { id } = req.params;
    const data = req.body;
    
    const employee = await updateData({id, data});
    if(!employee) {
      res.status(404).json({message: "No se pudo actualizar el empleado"})
    }
    res.json(employee);
  }

  static async deleteData (req, res) {
    const { id } = req.params;
    await deleteData({id});
    res.json({message: "Empleado eliminado"});
  }
}