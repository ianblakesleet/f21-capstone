const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('./controller')
const { createTodos } = require('./controller')

app.post('/api/user', createTodos)
app.put('/api/user/:id')

app.listen(3030, () => console.log('Server running on 3030'))
