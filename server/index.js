require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { SERVER_PORT } = process.env
app.use(cors())
app.use(express.json())
require('./controller')
const {
  createTodos,
  getAllTodos,
  editTodos,
  deleteTodo,
} = require('./controller')

app.post('/api/user', createTodos)
app.put('/api/user/:id', editTodos)
app.get('/api/user', getAllTodos)
app.delete('/api/user/:id', deleteTodo)

app.listen(SERVER_PORT, () => console.log('Server running on 3030'))
