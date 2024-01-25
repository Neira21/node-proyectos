/* eslint-disable */

const http = require('node:http') // protocolo http
const fs = require('node:fs')

const desirePort = process.env.PORT || 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  
  if(req.url === '/'){
    res.statuscode = 200
    res.end('Bienvenido a mi página de inicio')
  }else if(req.url === '/imagen-kirby-png'){
    fs.readFile('./kirby.png', (err, data)=> {
      if(err){
        res.end('No se pudo encontrar la imagen')
      }else {
        res.setHeader('Content-Type', 'image/png')
        //fs.createReadStream('./kirby.png').pipe(res)
        res.end(data)
      }
    })

  }else if (req.url === '/contacto'){
    res.statuscode = 200
    res.end('<h1> Bienvenido a mi página de contacto </h1>')
  } else {
    res.statuscode = 404
    res.end('Página no encontrada, Error 404')
  }
}

const server = http.createServer((req, res) => {
  processRequest(req, res)
})

server.listen(desirePort, () => {
  console.log(`Server listening on port http://localhost:${desirePort}`)
})
