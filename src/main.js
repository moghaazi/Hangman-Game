if (module.hot) {
  module.hot.accept() // HMR
}
import normalize from 'normalize.css' // Normalize

// Varibales
const letters = `abcdefghijklmnopqrstuvwxyz` // Letters
let lettersArr = Array.from(letters) // Letters array
let lettersCont = document.querySelector(`.letters`) //Letters container

// Generate letters
lettersArr.forEach(letter => {
  let span = document.createElement(`span`)
  let theLetter = document.createTextNode(letter)
  span.appendChild(theLetter)
  span.className = `letter-box`

  lettersCont.appendChild(span)
})

// Words & categories
const words = {
  coutries: [`egypt`, `yamen`, `united states of america`, `england`, `irland`],
  programming: [`html`, `css`, `javascript`, `php`, `rust`],
  langs: [`arabic`, `english`, `france`, `germany`, `turkey`],
}

// keys
let keys = Object.keys(words)
let randPropsNum = Math.floor(Math.random() * keys.length)
let randPropsName = keys[randPropsNum]
let randPropsVal = words[randPropsName]
let randValNum = Math.floor(Math.random() * randPropsVal.length)
let randKeyVal = randPropsVal[randPropsNum] // Chosen word

document.querySelector(`.game-info .category span`).innerHTML = randPropsName // Category

// Category Info
let letterGuessCont = document.querySelector(`.letters-guess`)
let letterAndSpace = Array.from(randKeyVal)
letterAndSpace.forEach(letter => {
  let emptySpan = document.createElement(`span`)
  letter === `` ? (emptySpan.className = `has-span`) : null
  letterGuessCont.appendChild(emptySpan)
})

let gussSpan = document.querySelectorAll(`.letters-guess span`) // Guess span
let wrongAttempts = 0 // Wrong attempts
let draw = document.querySelector(`.hangman-drwa`) // Draw

// Clicked letter
document.addEventListener(`click`, e => {
  let status = false // Chose statuus

  if (e.target.className === `letter-box`) {
    e.target.classList.add(`clicked`)
    let clickedLetter = e.target.innerHTML.toLowerCase()
    let chosenWord = Array.from(randKeyVal.toLowerCase())

    chosenWord.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        status = true
        gussSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter
          }
        })
      }
    })

    // Wrong letter
    if (status !== true) {
      wrongAttempts++
      draw.classList.add(`wrong-${wrongAttempts}`)

      if (wrongAttempts === 8) {
        gameOver()
        lettersCont.classList.add(`finshed`)
      }
    }
  }
})

//Game over func
let gameOver = () => {
  let div = document.createElement(`div`)
  let divText = document.createTextNode(`Game Over, The word is: ${randKeyVal}`)
  div.appendChild(divText)
  div.className = `game-over`

  document.body.appendChild(div)
}
