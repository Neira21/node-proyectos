const fs = require('fs')

/*
  Este metodo guarda la base de datos en un archivo db.json, 
  reemplazando el contenido anterior con el nuevo contenido que se le pase como parametro DB
 */
const saveToDatabase = (DB) => {
  fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2), {
    encoding: 'utf8'
  })
}

module.exports = { saveToDatabase }