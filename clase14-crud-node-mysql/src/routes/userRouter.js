import router from "express";
import connection from "../../conection/bd.js";
import { getUsers, login, registerUser, goEdit, deleteUser, editUser, goRegister, goLogin } from "../controllers/userController.js";

const userRouter = router();

userRouter.get("/users", async (req, res) => {
  const [result] = await connection.query("SELECT * FROM users");
  res.json(result);
});

// Todos los get
userRouter.get("/", getUsers);


userRouter.get("/login", goLogin );

userRouter.get("/register", goRegister );


userRouter.post("/login", login );

userRouter.post("/register", registerUser);

userRouter.get("/edit/:id", goEdit);

userRouter.post("/edit", editUser);

userRouter.get("/delete/:id", deleteUser);

export default userRouter;
