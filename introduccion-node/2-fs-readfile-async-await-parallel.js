// Método con async await
// El ES6 permite usar await dentro del archivo por lo que una opción para su uso sería usar la extensión mjs y en vez de require usar import from

const { readFile } = require('node:fs/promises')

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
  console.log('Primer texto', text)
  console.log('Segundo texto', text2)
})
