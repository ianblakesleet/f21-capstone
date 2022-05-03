const form = document.querySelector('#addTodoForm')
const todoContentBox = document.querySelector('#todoContentBox')
const taskVal = document.querySelector('#todoValue')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let task = taskVal.value
  let taskBody = {
    task: `${taskVal.value}`,
  }

  axios.post('http://localhost:3030/api/user', taskBody).then((res) => {
    console.log(res.data)
  })

  if (!task) {
    alert('you must add something!')
  } else {
    //getting the val of forms input to then assign to newly appended input
    const todoItemBox = document.createElement('div')
    const todoItem = document.createElement('input')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    //creating the boilerplate for todoItems
    todoItemBox.classList.add('todoItem')
    todoItem.classList.add('todoItem')
    todoItem.setAttribute('readonly', 'readonly')
    editBtn.classList.add('editTodo')
    deleteBtn.classList.add('deleteTodo')
    editBtn.innerText = 'Edit'
    deleteBtn.innerText = 'X'
    todoItem.value = task
    //adding classes to the created elements

    todoContentBox.appendChild(todoItemBox)
    todoItemBox.appendChild(todoItem)
    todoItemBox.appendChild(editBtn)
    todoItemBox.appendChild(deleteBtn)
    //appending to html
    taskVal.value = ''
    //resets the inputfield
    editBtn.addEventListener('click', () => {
      if (editBtn.innerText === 'Edit') {
        todoItem.removeAttribute('readonly')
        todoItem.focus()
        editBtn.innerText = 'Save'
      } else if (editBtn.innerText === 'Save') {
        todoItem.setAttribute('readonly', 'readonly')
        editBtn.innerText = 'Edit'
        // axios.put(`http://localhost:3030/api/user/${id}`)
      }
    })
    deleteBtn.addEventListener('click', () => {
      todoItemBox.remove()
    })
    //adding functionality to buttons
  }
})
////-----------------------LOGIN PAGE FUNCTIONALITY BELOW-------------///////
