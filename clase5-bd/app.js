import express, { json } from 'express' // require -> commonJS
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

export const createApp = ({movieModel}) => {
  const app = express()
  app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express
  // middleware de express para parsear el body a json
  app.use(json())
  app.use(corsMiddleware())
  
  app.get('/', (req, res) => {
    res.send('Hello World, from Express! 🚀 ')
  })
  
  // GET, POST, DELETE, PATCH
  app.use('/movies', createMovieRouter({movieModel}))
  
  const PORT = process.env.PORT ?? 1024
  
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
  
}








// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE
// CORS PRE-Flight
// OPTIONS

// Todos los recursos que sean MOVIES se identifica con /movies








/* 
  //esto va a parte de las rutas
  const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1024',
    'https://movies.com',
    'http://127.0.0.1'
  ]

  // sin middleware de cors, en el get de /movies:
  app.get('/movies', (req, res) => {
    const origin = req.get('origin')
    if(ACCEPTED_ORIGINS.includes(origin) || !origin ){
      res.header('Access-Control-Allow-Origin', origin)
    }
    // ...
  })
*/

/*
  // sin middleware de cors, en el delete o patch de /movies:
  const origin = req.header('origin')
  if(ACCEPTED_ORIGINS.includes(origin) || !origin ){
    res.header('Access-Control-Allow-Origin', origin)
  }

  // ademas de agregar options
  app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if(ACCEPTED_ORIGINS.includes(origin) || !origin ){
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    }
    res.send(200)
  })
*/