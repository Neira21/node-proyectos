const {User} = require("../models/User")

//middleware para verificar si el usuario existe
//En caso exista se agrega a req.user
const getUser = async (req, res, next) => {
  let user;
  const {id} = req.params;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    return res.status(400).json({message: "El id del usuario no es válido"})
  }
  try {
    user = await User.findById(id)
    if(!user){
      return res.status(404).json({message: "Usuario no encontrado"})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  req.user = user
  next()
}

module.exports = {
  getUser
}