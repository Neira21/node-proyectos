// Importar el modelo de la base de datos
const Workout = require('../database/Workout')
// importa uuid v4
const { v4: uuid } = require('uuid')

const getAll = () => {
  const allWorkouts = Workout.getAllWorkouts()
  return allWorkouts
}
const getById = (id) => {
  const workout = Workout.getById(id)
  return workout
}
const createOneWorkout = (workout) => {
  const newWorkout = {
    ...workout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
    updateAt: new Date().toLocaleString("en-US", { timeZone: "UTC"})
  }
  const result = Workout.createOneWorkout(newWorkout);
  return result;
}
const deleteOneWorkout = (id) => {
  Workout.deleteOneWorkout(id)
}
const updateOneWorkout = (id, workout) => {
  // const newWorkout = {
  //   ...workout,
  //   updateAt: new Date().toLocaleString("en-US", { timeZone: "UTC"})
  // }
  // const result = Workout.updateOneWorkout(id, newWorkout)
  return result
}

module.exports ={
  getAll,
  getById,
  createOneWorkout,
  deleteOneWorkout,
  updateOneWorkout
}
