import React from 'react'
import './style.css'
import Card from '../card/'
// import { PropTypes } from 'prop-types'

function Cards({ cards, choiceOne, choiceTwo, handleChoise, hint }) {
  const cardsArray = [...cards]

  const cardsArr = cardsArray.map((card) => {
    let isHint = card.url === hint.url

    return (
      <Card
        isHint={isHint}
        key={card.id}
        card={card}
        handleChoise={handleChoise}
        showed={card === choiceOne || card === choiceTwo || card.matched}
      />
    )
  })

  return <div className="cards">{cardsArr}</div>
}

export default Cards
// Cards.propTypes = {
//   url: PropTypes.string.isRequired,
// }
