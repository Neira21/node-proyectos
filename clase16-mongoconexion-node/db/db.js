const mongoose = require("mongoose")
const dotevn = require("dotenv")
dotevn.config()

const uri = `mongodb+srv://alvaroneira98:${process.env.MONGO_PASSWORD}@cluster0.ri5mvgb.mongodb.net/`

mongoose.connect(uri).then(() => {
  console.log("Conexión establecida con la base de datos")
}).catch((error) => {
  console.log("Error en la conexión", error)
})


const conexion = mongoose.connection

module.exports = conexion

