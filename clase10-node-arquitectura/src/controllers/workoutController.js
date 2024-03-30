const workoutService = require('../services/WorkoutService')
// importar el schema de zod con require
const { validateWorkout, validatePartialWorkout } = require('../schemas/workout')

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
  const result = validateWorkout(req.body)
  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newWorkout = workoutService.createOneWorkout(result.data)
  res.status(201).send({ status: "OK", newWorkout});
}

const deleteOneWorkout = async (req, res) => {
  const result = workoutService.deleteOneWorkout(req.params.id)
  console.log(result)
  res.send(`Delete workout ${req.params.id}`)
}

const updateOneWorkout = (req, res) =>{
  const { body, params: { id }} = req
  const result = validatePartialWorkout(body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const workoutUptated = workoutService.updateOneWorkout(id, result.data)
  return res.json(workoutUptated)
}

module.exports = {
  getAll,
  getById,
  createOneWorkout,
  deleteOneWorkout,
  updateOneWorkout
}



