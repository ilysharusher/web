const lineOne = document.querySelector('#lineOne')
const lineTwo = document.querySelector('#lineTwo')
const outputTask1 = document.querySelector('#output')

const phoneNumber = document.querySelector('#phoneNumber')
const phoneNumberRes = document.querySelector('#phoneNumberRes')

lineOne.addEventListener('input', getLine)
lineTwo.addEventListener('input', getLine)

function getLine() {
  const lineOneRes = countSymbols(lineOne.value)
  const lineTwoRes = countSymbols(lineTwo.value)

  outputTask1.innerHTML = lineOneRes > lineTwoRes ? lineOne.value : lineTwo.value
}

function countSymbols(str, char = 'a') {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++
    }
  }
  return count
}

phoneNumber.addEventListener('input', e => {
  phoneNumberRes.innerHTML = formattedPhone(e.target.value)
})

function formattedPhone(phone) {
  const digitsOnly = phone.replace(/\D/g, '')

  if (digitsOnly.length !== 12) {
    console.log(digitsOnly.length)
    return 'Неправильный формат номера телефона'
  }

  const formatted =
    `+${digitsOnly.slice(0, 2)} (${digitsOnly.slice(2, 5)}) ` +
    `${digitsOnly.slice(5, 8)}-${digitsOnly.slice(8, 10)}-${digitsOnly.slice(10, 12)}`

  return formatted
}

console.log(formattedPhone('+380234567890'))
