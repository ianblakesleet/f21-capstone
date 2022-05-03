const userForm = document.getElementById('login')
const userNameInput = document.getElementById('username')

userForm.addEventListener('submit', (e) => {
  e.preventDefault()

  window.localStorage.setItem('username', userNameInput.value)
  window.location.href = '/public/main.html'
})
