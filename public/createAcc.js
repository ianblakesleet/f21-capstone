const createForm = document.querySelector('#createAccForm')
const email = document.querySelector('#email')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let body = {
    email: `${email.value}`,
    username: `${username.value}`,
    password: `${[password.value]}`,
  }
  console.log('submit!')

  let emailCheck = [...email.value]
  if (emailCheck.includes('@')) {
    axios.post('http://localhost:3030/api/user/create', body).then((res) => {
      window.location.href = '/public/login.html'
      //once you create account, you will get routed back to login
    })
  } else {
    alert('no')
  }
})
