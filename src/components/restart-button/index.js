import React from 'react'
import './style.css'
function RestartButton({ startGame, dialogHide }) {
  const handleClick = () => {
    if (dialogHide) dialogHide()
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
