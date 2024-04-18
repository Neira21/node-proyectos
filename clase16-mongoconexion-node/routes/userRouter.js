const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt');
const { getUser } = require("../middlewares/getUser")

const { requireAuth } = require("../middlewares/verifyAuth")


const {User} = require("../models/User")

router.get("/", requireAuth, async (req, res) => {
  try {
    const users = await User.find()
    res.render("dashboard", {users})

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Crear un usuario
router.post("/", async (req, res) => {
  try {
    const {nombre, edad, pais, correo, password} = req.body;

    if(!nombre || !edad || !correo || !password){
      return res.status(400).json({message: "Los campos nombre, edad, correo y password son obligatorios"})
    }
    const passwordHash = await bcrypt.hash(password, 10);
    
    const newUser = new User({nombre, edad, pais, correo, password: passwordHash})
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.get("/find/:id", getUser, async (req, res) => {
  try {
    res.json(req.user)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.put("/:id", getUser, async (req, res) => {
  try {
    
    // Actualizar usuario
    const {nombre, edad, pais, correo, password} = req.body;
    const user = req.user
    
    // al objeto user se le asignan los valores que vienen en el body
    // si no vienen valores se asignan los que ya tiene el objeto user
    user.nombre = nombre || user.nombre;
    user.edad = edad || user.edad;
    // si el pais tenia un valor inexistente, entonces con user.pais = pais se le agrega una propiedad pais al objeto user
    user.pais = pais || user.pais;
  
    if(correo){
      if (correo && correo !== user.correo) {
        user.correo = correo;
      }    
    }

    //hash password del body
    if(password){
      user.password = await bcrypt.hash(password, 10) || user.password;
    }
    const updatedUser = await user.save()
    res.json(updatedUser)
    
  } catch (error) {
    res.status(500).json({message: error.message })
  }
})

router.get("/:id", getUser, async (req, res) => {
  try {
    const user = req.user
    await user.deleteOne({
      _id: user._id
    })
    res.redirect("/users")
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


module.exports = router
