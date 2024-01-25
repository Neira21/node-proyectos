const http = require('node:http')
const dittoJson = require('./pokemon/ditto.json')

const puerto = 3000

// pokemon/ditto

const proccesRequest = (req, res) => {
  const { url, method } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.end('Hola Mundo')
          break
        case '/pokemon/ditto':
          // res.writeHead(200, { 'Content-Type': 'application/json' })
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(dittoJson))
          break
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset = utf-8')
          res.end('Not found')
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          // Escuchar el evento end
          req.on('end', () => {
            const data = JSON.parse(body)
            // Llamar a una bd para guardar el pokemon
            res.writeHead(201, { 'Content-Type': 'application/json; charset=uft-8' })
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset = utf-8')
          res.end('Not found 2')
          break
      }
  }
}

const server = http.createServer((req, res) => {
  proccesRequest(req, res)
})

server.listen(puerto, () => {
  console.log(`Server listening on port http://localhost:${puerto}`)
})
