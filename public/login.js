const loginForm = document.querySelector('#login')
const userEmail = document.querySelector('#email')
const userPass = document.querySelector('#password')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let body = {
    email: `${userEmail.value}`,
    password: `${userPass.value}`,
  }
  axios.post('http://localhost:3030/api/user/auth', body).then((res) => {
    // console.log(res.data[0])
    const { username, user_id, email, user_pass } = res.data[0]
    if (userEmail.value === email && userPass.value === user_pass) {
      window.localStorage.setItem('userId', user_id)
      window.localStorage.setItem('username', `${username}`)
      window.localStorage.setItem('authenticated', true)
      window.location.href = '/public/main.html'
      //once it verifies info from database, it will save user_id and username into local storage. Then route to main app with that info.
    } else {
      alert('no')
    }
  })
})
