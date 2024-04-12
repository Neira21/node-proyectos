
export const goLogin = async (req, res) => {
  res.render("login");
}

export const login = async (req, res) => {
  //TODO
  const [result] = await connection.query(
    "SELECT * FROM users WHERE usuario = ? AND password = ?",
    [req.body.usuario, req.body.password]
  );
  if (result.length > 0) {
    res.redirect("/");
  } else {
    res.render("login", {
      error: "Usuario o contraseña incorrecta",
    });
  }
}

export const getUsers = async (req, res) => {
  let rol = req.query.rol;
  let query =
    "select u.id, u.usuario, r.id as rol_id, r.nombre as role from users u inner join roles r on u.rol_id = r.id";
  if (rol) {
    query += ` where r.nombre = '${rol}'`;
  }
  query += " order by u.id";
  let result;
  if (rol) {
    result = await connection.query(query, [rol]);
  } else {
    result = await connection.query(query);
  }
  res.render("index", { users: result[0] });
}


export const goRegister = async (req, res) => {
  res.render("register", {
    statusError: false,
    message: "",
  });
}

export const registerUser =  async (req, res) => {
  const { usuario, password, rol_id } = req.body;
  try {
    if (!usuario || !password || !rol_id) {
      res.render("register", {
        statusError: true,
        message: "Todos los campos son obligatorios",
      });
    } else {
      const [result] = await connection.query(
        "INSERT INTO users (usuario, password, rol_id) values (?, ?, ?)",
        [usuario, password, rol_id]
      );
      if (result.affectedRows === 1) {
        res.redirect("/login");
      } else {
        res.render("register", {
          statusError: true,
          message: "No se pudo insertar el usuario",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Error en el servidor");
  }
}

export const goEdit = async (req, res) => {
  console.log("asdasd");
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (result.length > 0) {
      res.render("edit", {
        user: result[0],
        statusError: false,
        message: "",
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
}

export const editUser = async (req, res) => {
  console.log("req.body", req.body);
  const [result] = await connection.query(
    "UPDATE users SET usuario = ?, password = ?, rol_id = ? WHERE id = ?",
    [req.body.usuario, req.body.password, req.body.rol_id, req.body.id]
  );
  if (result.affectedRows === 1) {
    res.redirect("/");
  } else {
    res.json({ message: "User not found" });
  }
}

export const deleteUser =  async (req, res) => {
  try {
    const [result] = await connection.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 1) {
      res.redirect("/");
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
}
