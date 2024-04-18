const express = require("express")
const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/userAuth")
const cookieParser = require("cookie-parser")
const app = express()

//Conexion database Mongo
const db = require("./db/db")
const { checkUser } = require("./middlewares/verifyAuth")
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static("public"))

//get user from middleware
app.use("*", checkUser)

//Routes Views
app.get("/", (req, res) => {
  res.render("home")
})
app.get("/register", (req, res) => {
  res.render("register")
})
app.get("/login", (req, res) => {
  res.render("login")
})

//Other routes
app.use("/users", userRouter)
app.use(authRouter)


const port = process.env.PORT || 3000
app.listen(port, ()=> {
  console.log(`Servidor corriendo en el puerto ${port}`)

})