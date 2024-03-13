
console.log(globalThis)

const fs = require('node:fs') // a partir de node 16, se recomienda poner node: antes de los módulos nativos

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // si es un archivo
  stats.isDirectory(), // si es un directorio
  stats.isSymbolicLink(), // si es un enlace simbólico
  stats.size, // en bytes
)
