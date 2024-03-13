// Express es un framework para NodeJS, para hacer aplicaciones web, apis, etc.

// importar json ditto de la carpeta pokemon
const dittoJson = require('./pokemon/ditto.json')

const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = 1234

// Middleware que hace todo lo de abajo,
// parsea el body y lo pone en req.body

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
//     data.createdAt = Date.now()
//     // Llamar a una bd para guardar el pokemon
//     // mudar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  // res json
  //res.json({ message: 'Hola Mundo' })
  res.status(200).send('<h1>Hola Mundo</h1>')

})
app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJson)
})

app.post('/pokemon', (req, res) => {
  console.log(req.body)
  res.status(201).json(req.body)
})


// app.post('/pokemon', (req, res) => {
//   let body = ''
//   // Escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   // Escuchar el evento end
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     // Llamar a una bd para guardar el pokemon
//     res.statusCode = 201
//     res.setHeader('Content-Type', 'application/json; charset=utf-8')
//     res.end(JSON.stringify(data))
//   })
// })

// la ultima a la que va a llegar
app.use((req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain; charset = utf-8')
  res.end('Not found')
})


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
