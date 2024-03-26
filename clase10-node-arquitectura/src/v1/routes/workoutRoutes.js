const express = require('express')
const workoutRouter = express.Router()
// enlazar a controladorr workout
const workoutController = require("../../controllers/workoutController")

workoutRouter.get('/', workoutController.getAll)

workoutRouter.get('/:id', workoutController.getById)

workoutRouter.post('/', workoutController.createOneWorkout)

workoutRouter.delete('/:id', workoutController.deleteOneWorkout)

workoutRouter.patch('/:id', workoutController.updateOneWorkout)

module.exports = workoutRouter