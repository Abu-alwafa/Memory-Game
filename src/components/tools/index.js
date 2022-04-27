import React from 'react'
import './style.css'
import RestartButton from '../restart-button'
import HintButton from '../hint-button'

function Tools({ startGame, handleHint }) {
  return (
    <div className="tools">
      <RestartButton startGame={startGame} />
      <HintButton handleHint={handleHint} />
    </div>
  )
}

export default Tools
