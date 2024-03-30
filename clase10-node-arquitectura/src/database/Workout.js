const DB = require('./db.json')
const { saveToDatabase } = require('./utils')
const getAllWorkouts = () => {
  return DB.workouts
}

const getById = (id) => {
  return DB.workouts.find(workout => workout.id === id)
}

const createOneWorkout = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.findIndex(workout => workout.name === newWorkout.name)
  if(isAlreadyAdded !== -1) return
  DB.workouts.push(newWorkout)
  saveToDatabase(DB)
  return newWorkout
}

const deleteOneWorkout = (id) => {
  const index = DB.workouts.findIndex(workout => workout.id === id)
  if(index === -1) return
  DB.workouts.splice(index, 1)
  saveToDatabase(DB)
}

const updateOneWorkout = (id, changes) => {
  const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === id);
  if (indexForUpdate === -1) return;
  
  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  DB.workouts[indexForUpdate] = updatedWorkout;
  saveToDatabase(DB);
  return updatedWorkout;
}


module.exports = {
  getAllWorkouts,
  getById,
  createOneWorkout,
  deleteOneWorkout,
  updateOneWorkout
}