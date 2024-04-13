const express = require('express')
const mongoose = require('mongoose')
const {config} = require('dotenv')
config()

const booksRouter = require('./routes/book.routes')

const app = express()

app.use(express.json())
app.use('/books', booksRouter)


// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL, {
  dbName : process.env.MONGO_DB_NAME  
})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB')
    console.error(error)
})


app.get('/', (req, res) => {
  res.send('<h1>Hola Mundo</h1>')
})


// Escuchando el puerto
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

