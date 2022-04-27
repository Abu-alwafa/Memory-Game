import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import './App.css'
import Cards from './components/cards'
import Dialog from './components/dialog'
import Tools from './components/tools'

export const DisabledContext = createContext()

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [dialogShow, setDialogShow] = useState(false)
  const [hint, setHint] = useState('')

  const rightSound = new Audio('assets/good-6081.mp3')
  const wrongSound = new Audio('assets/negative_beeps-6008.mp3')

  const getRandomPage = () => Math.round(Math.random() * (10 - 1) + 1)
  const buildUrl = () => {
    let url = new URL('https://api.pexels.com/v1/search')

    url.search = new URLSearchParams({
      query: 'shape',
      orientation: 'square',
      size: 'small',
      per_page: '6',
      page: getRandomPage(),
    })
    return url
  }
  const shuffleCards = () => {
    axios
      .get(
        `${buildUrl()}?key=563492ad6f917000010000019a40727dcf3843ed8cb6c3cd37255da1`,
      )
      .then((res) => {
        setCards(
          [...res.data.photos, ...res.data.photos]
            .sort(() => Math.random() - 0.5)
            .map((card) => {
              return { id: Math.random(), url: card.src.small, matched: false }
            }),
        )
      })
  }
  const handleChoise = (card) => {
    if (choiceOne) {
      if (card.id !== choiceOne.id) setChoiceTwo(card)
    } else {
      setChoiceOne(card)
    }
  }
  const handleHint = () => {
    let hintCard = ''
    const filteredCards = cards.filter((card) => card.matched === false)
    let randomIndex = Math.floor(Math.random() * filteredCards.length)
    hintCard = filteredCards[randomIndex]

    setHint(hintCard)
  }
  const startGame = () => {
    shuffleCards()
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurn) => prevTurn + 1)
    setDisabled(false)
  }

  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.url === choiceTwo.url) {
        setTimeout(() => rightSound.play(), 200)
        setCards((prevCards) => {
          return prevCards.map((card) => {
            return card.url === choiceOne.url
              ? { ...card, matched: true }
              : card
          })
        })
        resetTurn()
      } else {
        setTimeout(() => wrongSound.play(), 200)
        setTimeout(() => resetTurn(), 1000)
      }
    }

    setDialogShow(() => cards.every((card) => card.matched))
  }, [choiceOne, choiceTwo, cards])

  return (
    <div className="App">
      <DisabledContext.Provider value={{ disabled }}>
        <Cards
          cards={cards}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          handleChoise={handleChoise}
          hint={hint}
        />
      </DisabledContext.Provider>
      <Tools startGame={startGame} handleHint={handleHint} />
      <Dialog turns={turns} startGame={startGame} dialogShow={dialogShow} />
    </div>
  )
}

export default App
