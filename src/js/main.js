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
const inputSearch = document.querySelector('.input-search')
const modalBody = document.querySelector('.modal-body')
const modalTotalPrice = document.querySelector('.modal-pricetag')
const clearCartButton = document.querySelector('.clear-cart')

const cart = []

function getData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${err.status}`)
    })
}
getData('./db/partners.json').then(data => data.forEach(createCardRestaurant))

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
    cartButton.classList.add('hidden')
    logoutButton.removeEventListener('click', logOut)
    checkAuth()
  }

  console.log('Авторизован')
  cartButton.classList.remove('hidden')
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
  if (login) {
    authorized()
  } else {
    notAuthorized()
  }
}

checkAuth()

function createCardRestaurant(restaurant) {
  const card = document.createElement('a')
  const { image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery } = restaurant
  card.className = 'card'
  card.setAttribute('data-products', products)

  card.insertAdjacentHTML(
    'beforeend',
    `
    <div class='rounded-lg shadow-md overflow-hidden reveal-step-animation'>
      <div
        class='w-full bg-cover bg-center bg-no-repeat h-[250px]' style='background-image: url(${image})'
      ></div>
      <div class='bg-white md:px-6 sm:px-5 px-4 sm:pt-5 pt-4 md:pb-9 sm:pb-8 pb-7'>
        <div class='flex items-center justify-between'>
          <h4 class='font-bold md:text-2xl sm:text-xl text-lg'>${name}</h4>

          <div class='px-2 bg-black text-white sm:text-[12px] text-[11px] leading-5 rounded-sm'>${timeOfDelivery} мин</div>
        </div>

        <div class='flex items-baseline space-x-6 mt-2.5'>
          <div class='text-yellow-rating flex items-baseline sm:text-base text-sm'>
            <img src='./src/images/icons/rating.svg' alt='search icon' class='mr-2' />

            ${stars}
          </div>

          <div class='text-gray-7 md:text-lg sm:text-base text-sm'>
            От ${price} ₴
            <span class='font-bold px-2'>•</span> ${kitchen}
          </div>
        </div>
      </div>
    </div>
	`
  )
  cardsRestaurants.insertAdjacentElement('beforeend', card)
}

cardsRestaurants.addEventListener('click', openGoods)

function openGoods(event) {
  const target = event.target
  const restaurant = target.closest('.card')

  if (login) {
    if (restaurant) {
      menuBlock.classList.remove('hidden')
      main.classList.add('hidden')

      cardsMenu.textContent = ''

      cardsRestaurants.textContent = ''
      cardsMenu.textContent = ''
      getData('./db/' + restaurant.dataset.products).then(data => data.forEach(createCardGood))
    }
  } else {
    toggleModalAuth()
  }
}

function createCardGood(item) {
  console.log(item)
  const { description, image, name, price, id } = item
  const card = document.createElement('div')
  card.id = id
  card.className = 'rounded-lg shadow-md overflow-hidden card'

  card.insertAdjacentHTML(
    'beforeend',
    `
      <div class="w-full bg-cover bg-center bg-no-repeat h-[250px]" style='background-image: url(${image})'></div>
      <div class="bg-white md:px-6 sm:px-5 px-4 sm:pt-5 pt-4 md:pb-9 sm:pb-8 pb-7">
        <div class="space-y-2.5">
          <h4 class="md:text-2xl sm:text-xl text-lg line-clamp-1 card-title">${name}</h4>

          <p class="text-gray-7 line-clamp-2 sm:text-base text-sm">
            ${description}
          </p>
        </div>

        <div class="space-x-8 mt-6 flex items-center">
          <a href="#" class="py-2 px-4 border rounded-sm text-white bg-blue-6 flex items-center button-add-cart">
            <span>В корзину</span>
            <img src="./src/images/icons/cart-white.svg" alt="cart icon" class="ml-1" />
          </a>
          <div class="sm:text-xl font-bold text-lg card-price">${price} ₴</div>
        </div>
      </div>
	`
  )

  cardsMenu.insertAdjacentElement('beforeend', card)
}

logo.addEventListener('click', () => {
  menuBlock.classList.add('hidden')
  main.classList.remove('hidden')

  getData('./db/partners.json').then(data => data.forEach(createCardRestaurant))
})

inputSearch.addEventListener('keydown', event => {
  if (event.key == 'Enter') {
    const value = event.target.value.trim()

    if (!value) {
      event.target.classList.add('border-red-500')
      event.target.value = ''
      return
    }

    event.target.classList.remove('border-red-500')
    cardsMenu.textContent = ''
    getData('./db/partners.json')
      .then(data => data.map(partner => partner.products))
      .then(links => {
        cardsRestaurants.textContent = ''
        cardsMenu.textContent = ''
        links.forEach(link => {
          getData(`./db/${link}`).then(data => {
            const resultSearch = data.filter(item => {
              const name = item.name.toLowerCase()
              return name.includes(value.toLowerCase())
            })

            menuBlock.classList.remove('hidden')
            main.classList.add('hidden')

            console.log(resultSearch)
            resultSearch.forEach(createCardGood)
          })
        })
      })
  }
})

cardsMenu.addEventListener('click', addToCard)
function addToCard(event) {
  const target = event.target

  const buttonAddToCard = target.closest('.button-add-cart')

  if (buttonAddToCard) {
    const card = target.closest('.card')
    const title = card.querySelector('.card-title').textContent
    const price = card.querySelector('.card-price').textContent
    const id = card.id

    const food = cart.find(item => item.id === id)
    if (food) {
      food.count += 1
      return
    }

    cart.push({ title, price, id, count: 1 })
    renderCart()
  }
}

function renderCart() {
  modalBody.textContent = ''

  if (cart.length === 0) {
    const emptyCart = `
    <li
    class="food-row flex w-full sm:flex-row flex-wrap justify-between items-start pb-2.5 md:space-x-[384px] sm:space-x-[200px] border-b border-gray-5"
  >
    <span>Тут пусто, попробуйте что-то выбрать</span>
    <span></span>
  </li>
    `
    modalBody.insertAdjacentHTML('beforeend', emptyCart)
  }

  cart.forEach(({ title, price, id, count }) => {
    const itemCart = `
    <li id="${id}"
    class="food-row flex w-full sm:flex-row flex-wrap justify-between items-start pb-2.5 md:space-x-[384px] sm:space-x-[200px] border-b border-gray-5"
  >
    <div class="leading-8">${title}</div>
    <div class="flex items-center md:space-x-12 sm:space-x-10 space-x-4">
      <div class="sm:text-lg text-base font-bold">${price}</div>

      <div class="flex">
        <div
          class="border border-blue-6 text-blue-6 sm:w-10 sm:py-[3px] w-8 py-0.5 text-center sm:block hidden rounded-sm"
          role="button" data-id="${id}"
        >
          -
        </div>
        <input
          disabled
          type="number"
          value="${count}"
          class="arrows-none w-10 h-8 text-center appearance-none focus:ring-0 focus:outline-none focus:border-none"
        />
        <div class="text-sm sm:hidden self-center ml-1">шт.</div>
        <div
          class="border border-blue-6 text-blue-6 sm:w-10 sm:py-[3px] w-8 py-0.5 text-center sm:block hidden rounded-sm"
          role="button" data-id="${id}"
        >
          +
        </div>
      </div>
    </div>
  </li>
    `
    modalBody.insertAdjacentHTML('beforeend', itemCart)
  })

  const totalPrice = cart.reduce((result, item) => result + parseFloat(item.price) * item.count, 0)
  modalTotalPrice.textContent = totalPrice + ' ₴'
}
renderCart()

modalBody.addEventListener('click', changeCount)
function changeCount(event) {
  const target = event.target

  if (target.classList.contains('border-blue-6')) {
    const food = cart.find(item => item.id === target.closest('.food-row').id)

    console.log(target.textContent.contains)
    if (target.textContent.includes('-')) {
      food.count--
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1)
      }
    } else {
      food.count++
    }
    renderCart()
  }
}

clearCartButton.addEventListener('click', () => {
  cart.length = 0
  renderCart()
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
