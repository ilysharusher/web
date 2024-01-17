const cartButton = document.querySelector('#cart-button')

const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const body = document.querySelector('body')

cartButton.addEventListener('click', toggleModal)


function toggleModal() {
  close.removeEventListener('click', toggleModal)
  close.addEventListener('click', toggleModal)
  modal.classList.toggle('hidden')
  body.classList.toggle('overflow-hidden')
}


const authButton = document.querySelector('.auth-button')
const authModal = document.querySelector('.auth-modal')
const closeAuth = document.querySelector('.close-auth')
const loginForm = document.querySelector('#login-form')
const loginInput = document.querySelector('#login')
const passwordInput = document.querySelector('#password')
const logoutButton = document.querySelector('.logout-button')

let login = localStorage.getItem('user')

function toggleModalAuth() {
  console.log('toggleModalAuth')
  authModal.classList.toggle('hidden')
}

function authorized() {
  function logOut() {
    login = null
    localStorage.removeItem('user')
    logoutButton.classList.add('hidden')
    authButton.classList.remove('hidden')
    logoutButton.removeEventListener('click', logOut)
    checkAuth()
  }

  console.log('Авторизован')
  authButton.classList.add('hidden')
  logoutButton.classList.remove('hidden')

  logoutButton.addEventListener('click', logOut)
}

function notAuthorized() {
  console.log('Не авторизован')

  function logIn(event) {
    event.preventDefault()
    login = loginInput.value

    if (login) {
      if (passwordInput.value !== '123' && login === 'user') return
      localStorage.setItem('user', login)
      toggleModalAuth()
      authButton.classList.add('hidden')
      logoutButton.classList.remove('hidden')
      authButton.removeEventListener('click', toggleModalAuth)
      closeAuth.removeEventListener('click', toggleModalAuth)
      loginForm.removeEventListener('submit', logIn)
      loginForm.reset()
      checkAuth()
    } else {
      alert('Будь ласка, введіть логін та пароль')
    }
  }

  authButton.addEventListener('click', toggleModalAuth)
  closeAuth.addEventListener('click', toggleModalAuth)
  loginForm.addEventListener('submit', logIn)
}

function checkAuth() {
  console.log('checkAuth')
  if (login) {
    authorized()
  } else {
    notAuthorized()
  }
}

checkAuth()