import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import './App.css'
import Cards from './components/cards'
import Dialog from './components/dialog'
import Tools from './components/tools'
import { vars } from './environment'
const ImagesArray = [
  { url: 'assets/1.gif' },
  { url: 'assets/2.gif' },
  { url: 'assets/3.gif' },
  { url: 'assets/4.gif' },
  { url: 'assets/5.gif' },
  { url: 'assets/6.gif' },
]
export const DisabledContext = createContext()

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [dialogShow, setDialogShow] = useState(false)
  const [hint, setHint] = useState({})

  const rightSound = new Audio('assets/good-6081.mp3')
  const wrongSound = new Audio('assets/negative_beeps-6008.mp3')

  const getRandomPage = () => Math.round(Math.random() * (10 - 1) + 1)
  const buildUrl = () => {
    let url = new URL(vars.api_base)

    url.search = new URLSearchParams({
      query: 'shape',
      orientation: 'square',
      size: 'small',
      per_page: '6',
      page: getRandomPage(),
    })

    return url.toString()
  }
  const ls_photos_KEY = 'P_PHOTOS'
  let cache = {}
  const loadCacheFromLocalStorage = () => {
    let c = {}
    try {
      c = JSON.parse(localStorage.getItem(ls_photos_KEY))
    } catch (e) {
    } finally {
      cache = c
    }
  }

  const _shuffle = (arr) => arr.sort(() => Math.random() - 0.5)

  const localPhotos = _shuffle(
    ImagesArray.concat(ImagesArray).map((image, i) => {
      return {
        id: `${i}${Date.now()}`,
        matched: null,
        url: image.url,
      }
    }),
  )

  const _updateCache = (cache) => {
    localStorage.setItem(ls_photos_KEY, JSON.stringify(cache))
  }

  const getPhotos = async () => {
    try {
      const url = buildUrl()

      const res = cache[url]
        ? cache[url]
        : await axios.get(url, {
            headers: { Authorization: vars.pexels_api_key },
          })

      cache[url] = res

      _updateCache(cache)

      const photos = _shuffle(
        res.data.photos.concat(res.data.photos).map((photo, i) => {
          return {
            id: `${i}${Date.now()}`,
            matched: null,
            url: photo.src.tiny,
          }
        }),
      )

      // cards.push(...photos)
      setCards(photos)
    } catch (e) {}
  }
  const handleChoise = (card) => {
    if (choiceOne) {
      if (card.id !== choiceOne.id) setChoiceTwo(card)
    } else {
      setChoiceOne(card)
    }
  }
  const handleHint = () => {
    let hintCard
    const filteredCards = cards.filter((card) => !card.matched)
    let randomIndex = Math.floor(Math.random() * filteredCards.length)
    hintCard = filteredCards[randomIndex]

    setHint(hintCard)
  }
  const startGame = () => {
    loadCacheFromLocalStorage()
    getPhotos()
    setDialogShow(false)
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
