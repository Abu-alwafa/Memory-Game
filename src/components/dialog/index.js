import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import Confetti from 'react-dom-confetti'
import RestartButton from '../restart-button'
function Dialog({ startGame, turns, dialogShow }) {
  const [loader, setLoader] = useState(true)
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 60,
    elementCount: 500,
    dragFriction: 0.1,
    duration: 6000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '3000px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  }

  useEffect(() => {
    setTimeout(() => setLoader(false), 15000)
  }, [])
  return (
    <div className={dialogShow ? 'dialog show' : 'dialog'}>
      <Confetti active={dialogShow} config={config} />
      {dialogShow && <audio src="assets/start.wav" autoPlay></audio>}
      <div className="dialog-content">
        {loader ? (
          <h1>Loadin ...</h1>
        ) : (
          <>
            <h2>Excellent, You Are a Genius</h2>
            <h3 style={{ fontWeight: 500 }}>Turns : {turns}</h3>
            <div className="buttons">
              <RestartButton startGame={startGame} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dialog
