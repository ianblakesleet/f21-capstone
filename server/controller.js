let savedToDoItems = []
let globalId = 1
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
}
