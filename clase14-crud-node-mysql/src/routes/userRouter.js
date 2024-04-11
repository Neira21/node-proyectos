  import router from 'express';
  import connection from '../../conection/bd.js'

  const userRouter = router();

  // Todos los get
  userRouter.get('/', async (req, res) => {

    let rol = req.query.rol; 

    let query ='select u.id, u.usuario, r.id as rol_id, r.nombre as role from users u inner join roles r on u.rol_id = r.id'
    
    if(rol) {
      query+= ` where r.nombre = '${rol}'`
    }
    query+= ' order by u.id'

    let result;

    if(rol) {
      result = await connection.query(query, [rol])
    }else{
      result = await connection.query(query)
    }

    res.render('index' , {users: result[0]})
  })

  userRouter.get('/login', async (req, res) => {
    res.render('login')
  })

  userRouter.post('/login', async (req, res) => {
    //TODO
    const [result, ] = await connection.query('SELECT * FROM users WHERE usuario = ? AND password = ?', [req.body.usuario, req.body.password])
    if (result.length > 0) {
      res.redirect('/')
    } else {
      res.render('login', {
        error: 'Usuario o contraseña incorrecta'
      })
    }
  })


  userRouter.get('/register', async (req, res) => {
    res.render('register', {
      statusError: false,
      message: ''
    })
  })

  userRouter.post('/register', async (req, res) => {
    const {usuario, password, rol_id} = req.body
    try {
      if(!usuario || !password || !rol_id) {
        res.render('register', {
          statusError: true,
          message: 'Todos los campos son obligatorios'
        })
        
      }else{
        const [result, ] = await connection.query('INSERT INTO users (usuario, password, rol_id) values (?, ?, ?)', [usuario, password, rol_id])
        console.log(result)
        if(result.affectedRows === 1) {
            // Swal.fire({
            //   position: "top-end",
            //   icon: "success",
            //   title: "Your work has been saved",
            //   showConfirmButton: false,
            //   timer: 1500
            // });
          res.redirect('/login')
        } else {
          res.render('register', {
            statusError: true,
            message: 'No se pudo insertar el usuario'
          })
        }
      } 
    }catch(e) {
      console.log(e)
      res.status(500).send('Error en el servidor')
    }
  })


  userRouter.get('/:id', async (req, res) => {
    const result = await connection.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    console.log(result)
    res.render('index', {users: result[0]})
  })

  /*
  userRouter.post('/users', async (req, res) => {
    const [result, ] = await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [req.body.name, req.body.email])
    res.json(result)
  })
  */

  userRouter.patch('/edit/:id', async (req, res) => {
    const [result, ] = await connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [req.body.name, req.body.email, req.params.id])
    if(result.affectedRows === 1) {
      const [result1, ] = await connection.query('SELECT * FROM users')
      res.render('index', {users: result1[0]})
    } else {
      res.json({message: 'User not found'})
    }
  })

  userRouter.get('/delete/:id', async (req, res) => {
    try {
      const [result, ] = await connection.query('DELETE FROM users WHERE id = ?', [req.params.id])
      if(result.affectedRows === 1) {
        res.redirect('/')
      } else {
        res.json({message: 'User not found'})
      }
    } catch (error) {
      console.log(error)
    }
  })

  export default userRouter;