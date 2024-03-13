// Método sínconico para leer archivos, pausa todo el proceso hasta que se lea el archivo, lo hace 2 veces en este caso

const fs = require('node:fs')
console.log('Leyendo el 1er archivo...')
const text = fs.readFileSync('./archivo.txt', 'utf-8')

console.log(text)

console.log('Leyendo el 2do archivo...')
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')

console.log(text2)
