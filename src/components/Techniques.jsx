import { useState } from 'react'
import './Techniques.css'

function Techniques() {
  return (
    <div className="container">
      <h1>Smash the automatic thought techniques</h1>
      <ul className="techniques"></ul>
      <button className="more">Get More Techniques</button>
      <button className="reset">Start over</button>
    </div>
  )
}

export default Techniques
