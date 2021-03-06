require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const { SERVER_PORT } = process.env
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/main.html'))
})
// app.use(express.static('../public'))
app.use('/public', express.static(path.join(__dirname, '../public')))
const {
  createTodos,
  getAllTodos,
  editTodos,
  deleteTodo,
  authUser,
  createUserBcrypt,
  authUserBcrypt,
  createUser,
} = require('./controller')

app.post('/api/user', createTodos)
app.put('/api/user/:task_id', editTodos)
app.get('/api/user/:userId', getAllTodos)
app.delete('/api/user/:task_id', deleteTodo)
//user authentication
app.post('/api/user/auth', authUserBcrypt)
app.post('/api/user/create', createUserBcrypt)

const port = process.env.PORT || SERVER_PORT
app.listen(port, () => console.log('Server running on 3030'))
