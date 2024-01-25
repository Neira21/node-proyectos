// Método con async await
// El ES6 permite usar await dentro del archivo por lo que una opción para su uso sería usar la extensión mjs y en vez de require usar import from

const { readFile } = require('node:fs/promises');

(
  async () => {
    console.log('Leyendo el 1er archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('Primer texto', text)
    console.log('Haciendo otra cosa...')
    console.log('Leyendo el 2do archivo...')
    const text2 = await readFile('./archivo2.txt', 'utf-8')
    console.log('Segundo texto', text2)
  }
)()
