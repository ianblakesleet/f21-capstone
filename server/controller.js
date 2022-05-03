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
    res.status(200).send(savedToDoItems)
    globalId++
  },
  editTodos: (req, res) => {},
}
