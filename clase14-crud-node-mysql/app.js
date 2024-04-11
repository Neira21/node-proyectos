import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import userRouter from './src/routes/userRouter.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', userRouter)

const port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`server is running on ${port}`)
})