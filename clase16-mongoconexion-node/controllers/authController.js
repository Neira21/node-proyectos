const {User} = require("../models/User")
const jwt = require("jsonwebtoken")

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  //console.log(err.errors);
  let error = {nombre: '', edad: '', correo: '', password: ''};
  //incorrect email
  if(err.message === 'incorrect email'){
    error.correo = 'That email is not registered'
  }
  //incorrect password
  if(err.message === 'incorrect password'){
    error.password = 'That password is incorrect'
  }
  //email duplicate
  if(err.code === 11000){
    error.correo = 'That email is already registered'
  }
  if(err.message.includes('usuarios validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, 'secret key', { 
    expiresIn: maxAge
  }) 
}

module.exports.signup = async (req, res) => {
  try {
    const {nombre, edad, pais, correo, password} = req.body;
    
    const newUser = await User.create({nombre, edad, pais, correo, password})
    // Crear token pasando el id del usuario
    const token = createToken(newUser._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user: newUser._id})
  } catch (error) {
    const errors = handleErrors(error)
    res.status(500).json({errors})
  }
}

module.exports.login = async (req, res) => {
  const { correo, password} = req.body;
  try {
    const user = await User.login(correo, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(200).json({user: user._id})
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors})
  }
}

module.exports.logout = (req, res) => {
 res.cookie('jwt', '', {maxAge: 1}) 
  res.redirect('/')
}
