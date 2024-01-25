const path = require('node:path')

//Barra separadora de carpetas y archivos según SO
console.log(path.sep)

//Unir rutas
const filePath = path.join('content', 'carpeta', 'archivo.txt')
console.log(filePath)

//Nombre base del archivo
const base = path.basename(filePath)
console.log(base)

//Extensión del archivo
const ext = path.extname(filePath)
console.log(ext)