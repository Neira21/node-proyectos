// Método asínconico para leer archivos, se usa el método readFile, que recibe 3 parámetros, el primero es el path del archivo, el segundo es el encoding, y el tercero es un callback que recibe 2 parámetros, el error y el contenido del archivo, el callback se ejecuta cuando el archivo se haya leído, y el proceso no se pausa, por lo que se puede leer el 2do archivo mientras se lee el primero

const fs = require('node:fs')
console.log('Leyendo el 1er archivo...')
fs.readFile('./archivo.txt', 'utf-8', (error, text) => {
  if (error) {
    console.log(error)
    return
  }
  console.log(text)
})

console.log('Haciendo otra cosa...')

console.log('Leyendo el 2do archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (error, text) => {
  if (error) {
    console.log(error)
    return
  }
  console.log(text)
})
