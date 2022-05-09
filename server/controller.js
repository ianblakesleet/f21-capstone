const bcrypt = require('bcryptjs')
require('dotenv').config()
const { DATABASE_URL } = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

module.exports = {
  createTodos: (req, res) => {
    const { task, id, task_title } = req.body
    sequelize
      .query(
        `
    INSERT INTO tasks (author_id, task_title, task)
    VALUES (${id}, '${task_title}', '${task}')
    RETURNING * ;   
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0])
      })
      .catch((err) => console.log(err))
  },
  editTodos: (req, res) => {
    const { task_id } = req.params
    const { updatedTask } = req.body
    sequelize
      .query(
        `
    UPDATE tasks
    SET task = '${updatedTask}'
    WHERE task_id = ${task_id};
    
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0])
      })
      .catch((err) => console.log(err))

    // let index = savedToDoItems.findIndex((elem) => +elem.id === +id)
    // savedToDoItems[index].task = `${newTask}`
    // res.status(200).send(savedToDoItems)
  },
  getAllTodos: (req, res) => {
    const { userId } = req.params
    sequelize
      .query(
        `
    SELECT * FROM
    tasks
    WHERE author_id = ${userId}
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0])
      })
  },
  deleteTodo: (req, res) => {
    const { task_id } = req.params
    sequelize
      .query(
        `
    DELETE FROM
    tasks
    WHERE task_id = ${task_id};
    `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes)
      })
      .catch((err) => console.log(err))
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
  createUserBcrypt: (req, res) => {
    const { email, username, password } = req.body
    const salt = bcrypt.genSaltSync(5)
    const pHash = bcrypt.hashSync(password, salt)
    sequelize
      .query(
        `
      INSERT INTO users (email, username, user_pass)
      VALUES ('${email}', '${username}', '${pHash}');
      `
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0])
      })
      .catch((err) => console.log(err))
  },
  authUserBcrypt: (req, res) => {
    const { email, password } = req.body
    sequelize
      .query(
        `SELECT user_id, email, user_pass, username
       FROM users
       WHERE email = '${email}'
       RETURNING *
        `
      )
      .then((dbRes) => {
        // const validPass = bcrypt.compareSync(password, dbRes.user_pass.hash)
        console.log(dbRes.user_pass)
        // if (validPass) {
        //   res.status(200).send('true')
        // }
      })
  },
}
