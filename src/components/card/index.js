import React, { useState, useContext, useEffect, useRef } from 'react'
import { DisabledContext } from '../../App'
// import { PropTypes } from 'prop-types'
import './style.css'

function Card({ card, handleChoise, showed, isHint }) {
  const { disabled } = useContext(DisabledContext)
  const [rotate, setRotate] = useState(true)
  const handleClick = () => {
    if (!disabled) {
      handleChoise(card)
    }
  }
  const cardRef = useRef()
  useEffect(() => {
    setTimeout(() => setRotate(false), 500)
  }, [])

  return (
    <div
      className={showed || rotate || isHint ? 'card show' : 'card'}
      onClick={handleClick}
      ref={cardRef}
    >
      <img className={showed ? 'show' : ''} src={card.url} alt="" width="200" />
    </div>
  )
}

export default Card
