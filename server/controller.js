let savedToDoItems = []
let globalId = 1
require('dotenv').config()
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

module.exports = {
  createTodos: (req, res) => {
    const { task } = req.body
    let newTodo = {
      id: globalId,
      task: task,
    }
    savedToDoItems.push(newTodo)
    res.status(200).send(newTodo)
    globalId++
  },
  editTodos: (req, res) => {
    const { id } = req.params
    const { newTask } = req.body
    let index = savedToDoItems.findIndex((elem) => +elem.id === +id)
    savedToDoItems[index].task = `${newTask}`
    res.status(200).send(savedToDoItems)
  },
  getAllTodos: (req, res) => {
    res.status(200).send(savedToDoItems)
  },
  deleteTodo: (req, res) => {
    const { id } = req.params
    let index = savedToDoItems.findIndex((elem) => +elem.id === +id)
    savedToDoItems.splice(index, 1)
    res.status(200).send(savedToDoItems)
  },
  createUser: (req, res) => {
    const { email, username, password } = req.body
    sequelize
      .query(
        `
      INSERT INTO users (email, username, user_pass)
      VALUES ('${email}', '${username}', '${password}');
      `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0])
      })
      .catch((err) => console.log(err))
  },
  authUser: (req, res) => {
    const { email, password } = req.body
    sequelize
      .query(
        `SELECT user_id, email, user_pass, username
       FROM users
       WHERE email = '${email}' AND user_pass = '${password}';
        `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0])
      })
      .catch((err) => console.log(err))
  },
}
