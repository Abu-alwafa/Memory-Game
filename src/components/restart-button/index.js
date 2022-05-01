import React from 'react'
import './style.css'
function RestartButton({ startGame }) {
  const handleClick = () => {
    startGame()
  }
  return (
    <button onClick={() => handleClick()} className="restart-btn">
      {/* <span>Restart</span> */}
      <i className="fa-solid fa-arrows-rotate"></i>
    </button>
  )
}

export default RestartButton
