const workoutService = require('../services/WorkoutService')

const getAll = (req, res) => {
  const allWorkouts = workoutService.getAll()
  res.send({status: 'OK', data: allWorkouts})
}
const getById = (req, res) => {
  const workout = workoutService.getById(req.params.id)
  if(workout) return res.json(workout)
  res.status(404).json({ message: 'Movie not found' })
}
const createOneWorkout = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    return;
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  const resuilt = workoutService.createOneWorkout(newWorkout)
  res.status(201).send({ status: "OK", data: resuilt });

}
const deleteOneWorkout = (req, res) => {
  workoutService.deleteOneWorkout(req.params.id)
  res.send(`Delete workout ${req.params.id}`)
}
const updateOneWorkout = (req, res) =>{
  workoutService.updateOneWorkout(req.params.id, req.body)
  res.send(`Update workout ${req.params.id}`)
}

module.exports = {
  getAll,
  getById,
  createOneWorkout,
  deleteOneWorkout,
  updateOneWorkout
}



