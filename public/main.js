const form = document.querySelector('#addTodoForm')
const todoContentBox = document.querySelector('#todoContentBox')
const taskVal = document.querySelector('#todoValue')
const currentUserId = localStorage.getItem('userId')
const welcomeMessage = document.querySelector('#welcome-banner')
const backToLogin = document.getElementById('signout')
welcomeMessage.innerText += ' ' + window.localStorage.getItem('username')

const createCard = (task, task_id) => {
  //getting the val of forms input to then assign to newly appended input
  const todoItemBox = document.createElement('div')
  const todoItem = document.createElement('textarea')
  const editBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')
  //creating the boilerplate for todoItems
  todoItemBox.classList.add('todoItemBox')
  todoItem.classList.add('todoItem')
  todoItem.setAttribute('readonly', 'readonly')
  //attributes for my autogrow function to resize textarea
  todoItem.setAttribute('onkeypress', 'autoGrow(this)')
  todoItem.setAttribute('onkeyup', 'autoGrow(this)')
  editBtn.classList.add('editTodo')
  deleteBtn.classList.add('deleteTodo')
  editBtn.innerText = 'Edit'
  deleteBtn.innerText = 'X'

  todoItem.value = `${task}`
  //setting value to the input from response data.

  todoContentBox.appendChild(todoItemBox)
  todoItemBox.appendChild(todoItem)
  todoItemBox.appendChild(editBtn)
  todoItemBox.appendChild(deleteBtn)
  autoGrow(todoItem)
  //appending to html
  taskVal.value = ''
  //resets the inputfield
  editBtn.addEventListener('click', () => {
    if (editBtn.innerText === 'Edit') {
      todoItem.removeAttribute('readonly')
      todoItem.focus()
      todoItem.classList.add('textChange')
      editBtn.classList.add('colorChange')
      editBtn.innerText = 'Save'
    } else if (editBtn.innerText === 'Save') {
      todoItem.setAttribute('readonly', 'readonly')
      editBtn.innerText = 'Edit'
      todoItem.classList.remove('textChange')
      editBtn.classList.remove('colorChange')
      //this here is to edit task, and send a put request to edit it in database.
      let editedTodo = {
        updatedTask: `${todoItem.value}`,
      }

      axios
        .put(`http://localhost:3030/api/user/${task_id}`, editedTodo)
        .then((res) => {
          console.log(res.data)
        })
    }
  })
  deleteBtn.addEventListener('click', () => {
    todoItemBox.remove()
    axios.delete(`http://localhost:3030/api/user/${task_id}`).then((res) => {
      console.log('deleted task!')
    })
  })
}
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let taskItem = taskVal.value
  let taskBody = {
    task: `${taskVal.value}`,
    id: currentUserId,
  }

  if (!taskItem) {
    alert('you must add something!')
    return
  }
  axios.post('http://localhost:3030/api/user', taskBody).then((res) => {
    const { task, task_id } = res.data[0]
    console.log(res.data)
    console.log(task, task_id)

    createCard(task, task_id)
  })
})

backToLogin.addEventListener('click', () => {
  window.localStorage.removeItem('userId')
  window.localStorage.removeItem('username')
  window.location.href = './login.html'
})

//loops over all user data on tasks to render it on screen load
window.addEventListener('load', () => {
  axios.get(`http://localhost:3030/api/user/${currentUserId}`).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      const { task, task_id } = res.data[i]
      console.log(res.data[i])
      createCard(task, task_id)
    }
  })
})

//text area auto resizing, also implemented inside create function to reset size on todo create.

const autoGrow = (element) => {
  element.style.height = '5px'
  element.style.height = element.scrollHeight + 'px'
}
