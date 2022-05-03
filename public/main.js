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
      const { task, id } = res.data
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
      todoItem.value = `${task}`
      //setting value to the input from response data.

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
          //this here is to edit task, and send a put request to edit it in database.
          let editedTodo = {
            newTask: `${todoItem.value}`,
          }

          axios
            .put(`http://localhost:3030/api/user/${id}`, editedTodo)
            .then((res) => {
              console.log(res.data)
            })
        }
      })
      deleteBtn.addEventListener('click', () => {
        todoItemBox.remove()
        axios.delete(`http://localhost:3030/api/user/${id}`).then((res) => {
          console.log(res.data)
        })
      })
      //adding functionality to buttons
    })
  }
})
// document.querySelector('#signout').addEventListener('click', () => {
//   axios.get('http://localhost:3030/api/user/').then((res) => {
//     console.log(res.data)
//   })
// })
//adding welcome message with username thats saved to locastorage(from fake login page) also adding a routing back with singout button, that also clears local storage.
const welcomeMessage = document.querySelector('#welcome-banner')
const backToLogin = document.getElementById('signout')

welcomeMessage.innerText += ' ' + window.localStorage.getItem('username')

backToLogin.addEventListener('click', () => {
  window.localStorage.removeItem('username')
  window.location.href = './login.html'
})
