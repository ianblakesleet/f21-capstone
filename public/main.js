const form = document.querySelector('#addTodoForm')
const todoContentBox = document.querySelector('#todoContentBox')
const taskVal = document.querySelector('#todoValue')
const taskTitleVal = document.querySelector('#titleValue')
const currentUserId = localStorage.getItem('userId')
const welcomeMessage = document.querySelector('#welcome-banner')
const backToLogin = document.getElementById('signout')
welcomeMessage.innerText += ' ' + window.localStorage.getItem('username')

const createCard = (task, task_id, task_title) => {
  const todoItemBox = document.createElement('div')
  const todoTitleBox = document.createElement('div')
  const todoItemTitle = document.createElement('input')
  // const todoTitleBox = document.createElement('div')
  const todoDescription = document.createElement('div')
  const todoItem = document.createElement('textarea')
  const editBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')
  //creating the boilerplate for todoItems
  todoItemBox.classList.add('todoItemBox')
  todoTitleBox.classList.add('todoTitleBox')
  todoItemTitle.classList.add('todoItemTitle')

  todoDescription.classList.add('todoDescription')
  todoItem.classList.add('todoItem')
  editBtn.classList.add('editTodo')
  deleteBtn.classList.add('deleteTodo')
  todoItemTitle.setAttribute('readonly', 'readonly')
  todoItem.setAttribute('readonly', 'readonly')
  //attributes for my autogrow function to resize textarea
  todoItem.setAttribute('onkeypress', 'autoGrow(this)')
  todoItem.setAttribute('onkeyup', 'autoGrow(this)')
  todoItemTitle.setAttribute('onkeypress', 'autoGrowWidth(this)')
  todoItemTitle.setAttribute('onkeyup', 'autoGrowWidth(this)')
  editBtn.innerText = 'Edit'
  // deleteBtn.innerText = 'X'
  deleteBtn.innerHTML = `<i class="gg-trash"></i>`

  todoItemTitle.value = `${task_title}`
  todoItem.value = `${task}`
  //setting value to the input from response data.

  todoContentBox.appendChild(todoItemBox)
  todoItemBox.appendChild(todoTitleBox)
  todoTitleBox.appendChild(todoItemTitle)
  todoContentBox.appendChild(todoDescription)
  todoDescription.appendChild(todoItem)
  todoDescription.appendChild(editBtn)
  todoDescription.appendChild(deleteBtn)
  autoGrow(todoItem)
  autoGrowWidth(todoItemTitle)
  //appending to html
  taskVal.value = ''
  taskTitleVal.value = ''
  //resets the inputfield
  editBtn.addEventListener('click', () => {
    if (editBtn.innerText === 'Edit') {
      todoItem.removeAttribute('readonly')
      todoItemTitle.removeAttribute('readonly')
      todoItem.focus()
      todoItem.classList.add('textChange')
      todoItemTitle.classList.add('textChange')
      editBtn.classList.add('colorChange')
      editBtn.innerText = 'Save'
    } else if (editBtn.innerText === 'Save') {
      todoItem.setAttribute('readonly', 'readonly')
      todoItemTitle.setAttribute('readonly', 'readonly')
      editBtn.innerText = 'Edit'
      todoItem.classList.remove('textChange')
      todoItemTitle.classList.remove('textChange')
      editBtn.classList.remove('colorChange')
      //this here is to edit task, and send a put request to edit it in database.
      let editedTodo = {
        updatedTask: `${todoItem.value}`,
        updatedTitle: `${todoItemTitle.value}`,
      }

      axios.put(`/api/user/${task_id}`, editedTodo).then((res) => {
        console.log(res.data)
      })
    }
  })
  deleteBtn.addEventListener('click', () => {
    todoItemBox.remove()
    todoDescription.remove()
    axios.delete(`/api/user/${task_id}`).then((res) => {
      console.log('deleted task!')
    })
  })
}
//create task item
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let taskItem = taskVal.value
  let titleItem = taskTitleVal.value
  let taskBody = {
    task_title: `${taskTitleVal.value}`,
    task: `${taskVal.value}`,
    id: currentUserId,
  }

  if (!taskItem) {
    alert('you must add something!')
  } else if (!titleItem) {
    alert('you must add a title to the task!')
  } else {
    axios.post('/api/user', taskBody).then((res) => {
      const { task, task_id, task_title } = res.data[0]
      console.log(res.data)
      console.log(task, task_id, task_title)

      createCard(task, task_id, task_title)
    })
  }
  document.querySelector('#todoValue').style.height = '25px'
})

backToLogin.addEventListener('click', () => {
  window.localStorage.removeItem('userId')
  window.localStorage.removeItem('username')
  window.localStorage.removeItem('authenticated')
  window.location.href = '/public/login.html'
})

//loops over all user data on tasks to render it on screen load
window.addEventListener('load', () => {
  if (!window.localStorage.getItem('authenticated')) {
    window.location.href = '/public/login.html'
  } else {
    axios.get(`/api/user/${currentUserId}`).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const { task, task_id, task_title } = res.data[i]
        console.log(res.data[i])
        createCard(task, task_id, task_title)
      }
    })
  }
})

//text area auto resizing, also implemented inside create function to reset size on todo create.

const autoGrow = (element) => {
  element.style.height = '5px'
  element.style.height = element.scrollHeight + 'px'
}

const autoGrowWidth = (element) => {
  element.style.width = '8px'
  element.style.width = element.scrollWidth + 'px'
}
