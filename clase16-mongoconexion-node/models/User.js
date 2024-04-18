const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Please enter a Name'],
    trim: true
  },
  edad: {
    type: Number,
    required: [true, 'Please enter an Age']
  },
  pais: {
    type: String
  },
  correo: {
    type: String,
    required: [true, 'Please enter an Email'],
    unique: [true, 'Email already exists'],
    validate: [isEmail, 'Please enter a validate Email' ]
  },
  password: {
    type: String,
    required: [true, 'Please enter a Password']
  }
})

// Disparar una función después de guardar un documento
// userSchema.post('save', (doc, next) => {
//   console.log("New user was created & saved", doc)
//   next()
// })

// Disparar una función antes de guardar un documento
// encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function (correo, password){
  const user = await this.findOne({correo})
  if(user){
    const auth = await bcrypt.compare(password, user.password)
    if(auth){
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

//Se export el modelo: User es el nombre del modelo, userSchema es el esquema
module.exports = {
  User: mongoose.model("usuarios", userSchema)
}
