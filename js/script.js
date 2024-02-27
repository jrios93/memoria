const totalCards = 12
const availableCard = [
  { src: '/assets/chanchito.png', title: 'chanchito' },
  { src: '/assets/elefante.png', title: 'elefante' },
  { src: '/assets/gallina.png', title: 'gallina' },
  { src: '/assets/monosaltando.png', title: 'mono saltando de un pie' },
  { src: '/assets/monosombrero.png', title: 'mono con sombrero' },
  { src: '/assets/perro.png', title: 'perro alegre' },
]
let cards = []
let selectedCards = []
let valuesUsed = []
let currentMove = 0
let currentAttempts = 0

let cardTemplate = `<div class="card">
<div class="back"></div>
<div class="face"></div>
</div>`

function activate(e) {
  if (currentMove < 2) {
    if (
      (!selectedCards[0] || selectedCards[0] !== e.target) &&
      !e.target.classList.contains('active')
    ) {
      e.target.classList.add('active')
      selectedCards.push(e.target)

      if (++currentMove == 2) {
        currentAttempts++
        document.querySelector('#stats').innerHTML =
          currentAttempts + ' intentos'
        if (
          selectedCards[0].querySelectorAll('.face')[0].innerHTML ==
          selectedCards[1].querySelectorAll('.face')[0].innerHTML
        ) {
          selectedCards = []
          currentMove = 0
        } else {
          setTimeout(() => {
            selectedCards[0].classList.remove('active')
            selectedCards[1].classList.remove('active')
            selectedCards = []
            currentMove = 0
          }, 600)
        }
      }
    }
  }
}

function getRandomCardIndexes() {
  let indexes = []
  while (indexes.length < totalCards) {
    const randomIndex = Math.floor(Math.random() * availableCard.length)
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex, randomIndex)
    }
  }
  return indexes
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const randomIndexes = shuffleArray(getRandomCardIndexes())

for (let i = 0; i < totalCards; i++) {
  let div = document.createElement('div')
  div.innerHTML = cardTemplate
  cards.push(div)
  document.querySelector('#game').append(cards[i])
  cards[i].querySelectorAll(
    '.face'
  )[0].innerHTML = `<img style="width:100px" src="${
    availableCard[randomIndexes[i]].src
  }" alt="${availableCard[randomIndexes[i]].title}">`
  cards[i].querySelectorAll('.card')[0].addEventListener('click', activate)
}
