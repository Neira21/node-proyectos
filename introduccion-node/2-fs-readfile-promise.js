// Método asínconico para leer archivos, usando promesas

const fs = require('node:fs/promises')

//Esto solo para modulos nativos que no tienen promesas nativas, el fs si las tiene

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

console.log('Leyendo el 1er archivo...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => console.log(text))
  .catch(error => console.log(error)) // se puede usar un catch para capturar errores

console.log("Haciendo otra cosa...")


console.log('Leyendo el 2do archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => console.log(text))
  .catch(error => console.log(error)) // se puede usar un catch para capturar errores
