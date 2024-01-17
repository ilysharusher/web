'use strict'

const cartButton = document.querySelector('#cart-button')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const body = document.querySelector('body')
const logo = document.querySelector('.logo')

const authButton = document.querySelector('.auth-button')
const authModal = document.querySelector('.auth-modal')
const closeAuth = document.querySelector('.close-auth')
const loginForm = document.querySelector('#login-form')
const loginInput = document.querySelector('#login')
const passwordInput = document.querySelector('#password')
const logoutButton = document.querySelector('.logout-button')
const authModalInner = document.querySelector('.modal-inner')
const authModalBackdrop = document.querySelector('.modal-backdrop')

const cardsRestaurants = document.querySelector('.cards-restaurants')
const cardsMenu = document.querySelector('.menu')
const menuBlock = document.querySelector('.menu-block')
const main = document.querySelector('.main')

cartButton.addEventListener('click', toggleModal)

function toggleModal() {
  close.removeEventListener('click', toggleModal)
  close.addEventListener('click', toggleModal)
  modal.classList.toggle('hidden')
  body.classList.toggle('overflow-hidden')
}

authModalBackdrop.addEventListener('click', toggleModalAuth)
authModalInner.addEventListener('click', event => event.stopPropagation())
let login = localStorage.getItem('user')

function toggleModalAuth() {
  loginInput.classList.remove('border-red-500')
  passwordInput.classList.remove('border-red-500')
  body.classList.toggle('overflow-hidden')
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

    if (!login.trim()) {
      loginInput.classList.add('border-red-500')
    }

    if (!passwordInput.value.trim()) {
      passwordInput.classList.add('border-red-500')
      return
    }

    if (passwordInput.value !== '123' || login !== 'user') return
    localStorage.setItem('user', login)
    toggleModalAuth()
    authButton.classList.add('hidden')
    logoutButton.classList.remove('hidden')
    authButton.removeEventListener('click', toggleModalAuth)
    closeAuth.removeEventListener('click', toggleModalAuth)
    loginForm.removeEventListener('submit', logIn)
    loginForm.reset()
    checkAuth()
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

function createCardRestaurant() {
  const card = document.createElement('a')
  //{ image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery }
  // card.className = 'card card-restaurant'
  // card.products = products
  // card.info = [name, price, stars, kitchen]

  card.insertAdjacentHTML(
    'beforeend',
    `
    <div class='rounded-lg shadow-md overflow-hidden reveal-step-animation card'>
      <div
        class='w-full bg-cover bg-center bg-no-repeat h-[250px] bg-[url(/src/images/products/pizza-plus.jpg)]'
      ></div>
      <div class='bg-white md:px-6 sm:px-5 px-4 sm:pt-5 pt-4 md:pb-9 sm:pb-8 pb-7'>
        <div class='flex items-center justify-between'>
          <h4 class='font-bold md:text-2xl sm:text-xl text-lg'>Пицца плюс</h4>

          <div class='px-2 bg-black text-white sm:text-[12px] text-[11px] leading-5 rounded-sm'>50 мин</div>
        </div>

        <div class='flex items-baseline space-x-6 mt-2.5'>
          <div class='text-yellow-rating flex items-baseline sm:text-base text-sm'>
            <img src='./src/images/icons/rating.svg' alt='search icon' class='mr-2' />

            4.5
          </div>

          <div class='text-gray-7 md:text-lg sm:text-base text-sm'>
            От 900 ₴
            <span class='font-bold px-2'>•</span> Пицца
          </div>
        </div>
      </div>
    </div>
	`
  )
  console.log(card)
  cardsRestaurants.insertAdjacentElement('beforeend', card)
}
createCardRestaurant()
createCardRestaurant()
createCardRestaurant()

cardsRestaurants.addEventListener('click', openGoods)

function openGoods(event) {
  const target = event.target
  const restaurant = target.closest('.card')

  if (login) {
    if (restaurant) {
      menuBlock.classList.remove('hidden')
      main.classList.add('hidden')

      cardsMenu.textContent = ''

      createCardGood()
      createCardGood()
      createCardGood()
    }
  } else {
    toggleModalAuth()
  }
}

function createCardGood() {
  //{ description, image, name, price, id }
  const card = document.createElement('div')
  card.className = 'rounded-lg shadow-md overflow-hidden'

  card.insertAdjacentHTML(
    'beforeend',
    `
      <div class="w-full bg-cover bg-center bg-no-repeat h-[250px] bg-[url(/src/images/products/sushi/sushi1.png)]"></div>
      <div class="bg-white md:px-6 sm:px-5 px-4 sm:pt-5 pt-4 md:pb-9 sm:pb-8 pb-7">
        <div class="space-y-2.5">
          <h4 class="md:text-2xl sm:text-xl text-lg line-clamp-1">Ролл угорь стандарт</h4>

          <p class="text-gray-7 line-clamp-2 sm:text-base text-sm">
            Рис, угорь, соус унаги, кунжут, водоросли нори.
          </p>
        </div>

        <div class="space-x-8 mt-6 flex items-center">
          <a href="#" class="py-2 px-4 borderrounded-sm text-white bg-blue-6 flex items-center">
            <span>В корзину</span>
            <img src="./src/images/icons/cart-white.svg" alt="cart icon" class="ml-1" />
          </a>
          <div class="sm:text-xl font-bold text-lg">250 ₴</div>
        </div>
      </div>
	`
  )

  cardsMenu.insertAdjacentElement('beforeend', card)
}

logo.addEventListener('click', () => {
  menuBlock.classList.add('hidden')
  main.classList.remove('hidden')
})

new Swiper('.swiper-container', {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  spaceBetween: 10,
  effect: 'cube',
  cubeEffect: {
    shadow: false,
  },
})
