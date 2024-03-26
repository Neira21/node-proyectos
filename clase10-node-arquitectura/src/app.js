

const express = require('express')
const  routerWorkout = require('./v1/routes/workoutroutes')

const app = express()

const port = process.env.PORT || 3000
app.use(express.json())
app.use('/api/v1/workouts', routerWorkout)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

