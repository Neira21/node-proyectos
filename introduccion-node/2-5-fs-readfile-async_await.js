// A diferencia de los ejemplos anteriores, se extrae el método readFile de la librería fs/promises, 
// que es nativa de Node.js, y se usa el método readFile para leer el contenido de los archivos 
// archivo.txt y archivo2.txt. 

// Se usa el método await para esperar a que se lea el archivo y se almacena el contenido en las 
// variables text y text2, respectivamente. Se imprime el contenido de los archivos en la consola.

// Cuando se usa el commonJS, para poder usar el await, se debe usar una función asíncrona, por lo
// que se crea una función anónima y se invoca inmediatamente.

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
