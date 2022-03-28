const express = require("express")
const {register,login} = require("./controllers/user.controller")

const todosController = require("./controllers/todo.controller")


const app = express();



app.use(express.json())

app.post("/register",register)
app.post("/login", login)

app.use("/todos", todosController)

module.exports = app;