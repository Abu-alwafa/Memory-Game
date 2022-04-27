import React from 'react'
import './style.css'
function HintButton({ handleHint }) {
  const handleClick = () => {
    handleHint()
  }
  return (
    <button className="hint-btn" onClick={handleClick}>
      {/* <span>Hint</span> */}
      <i className="fa-solid fa-circle-info"></i>
    </button>
  )
}

export default HintButton
