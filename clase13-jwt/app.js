import express from 'express';
import jwt from 'jsonwebtoken';
import { keys } from './settings/keys.js';

const app = express();

app.set('key', keys.key)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/login', (req, res) => {
  if(req.body.usuario === 'admin' && req.body.password === 12345){
    // Payload es la información que se va a enviar en el token, en este caso solo un check con el valor de true
    // En otros casos se puede enviar el id del usuario, el nombre, etc
    const payload = {
      check:true
    };
    const token = jwt.sign(payload, app.get('key'), {
      // nunca expira
      expiresIn: '1d'
    });
    res.json({
      message: 'Autenticación correcta',
      token: token
    })
  } else{
    res.json({message: 'Usuario o contraseña incorrectos'})
  }
})


// En este caso, la ruta será un middleware que verifica si el token es correcto
const verificacion = express.Router();

verificacion.use((req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  //console.log(token)
  if(!token){
    res.status(401).json({message: 'Necesitas un token para acceder'})
    return
  }
  if(token.startsWith('Bearer ')){
    // slice recibe dos parametros, el primero es el inicio y el segundo el final
    token = token.slice(7, token.length)
    console.log(token)
  }
  if(token){
    // Para ver si el token decide
    jwt.verify(token, app.get('key'), (err, decoded) => {
      if(err){
        return res.json({message: 'El Token es inválido'})
      } else{
        req.decoded = decoded
        console.log("decoded", decoded)
        next()
      }
    })
  }
})

app.use('/info', verificacion , (req, res) => {
  res.json('Información contable y financiera privada')
}) 