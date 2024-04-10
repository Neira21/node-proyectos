import { Router } from 'express'
import { LoginUser, RegisterUser, isUserAuthenticated, logout } from '../controllers/AuthController.js'

const router = Router()

router.get('/', isUserAuthenticated, (req, res) => {
  res.render('index', {
    user: req.user
  })
})

router.get('/login', (req, res) => {
  res.render('login', {alert: false})
})

router.get('/register', (req, res) => {
  res.render('register')
})

// Para el registro y login de usuarios
router.post('/register', RegisterUser)
router.post('/login', LoginUser)

router.get('/logout', logout)

export default router