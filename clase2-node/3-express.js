// importar json ditto de la carpeta pokemon
const dittoJson = require('./pokemon/ditto.json')

const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = 1234

app.use(express.json())

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   // Escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })
//   // Escuchar el evento end
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     // Llamar a una bd para guardar el pokemon
//     // mudar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  // res json
  res.json({ message: 'Hola Mundo' })
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJson)
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar a la bd
  res.status(201).json(req.body)
})

// la ultima a la que va a llegar
app.use((req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain; charset = utf-8')
  res.end('Not found')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
