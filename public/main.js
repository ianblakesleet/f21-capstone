const form = document.querySelector('#addTodoForm')
const todoContentBox = document.querySelector('#todoContentBox')
const taskVal = document.querySelector('#todoValue')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let task = taskVal.value
  let taskBody = {
    task: `${taskVal.value}`,
  }

  if (!task) {
    alert('you must add something!')
  } else {
    axios.post('http://localhost:3030/api/user', taskBody).then((res) => {
      const { task } = res.data
      console.log(res.data)
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
      //setting value to the input from response data.

      todoItem.value = `${task}`
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
    })
  }
})
