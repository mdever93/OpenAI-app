import React from 'react'
import DarkMode from '../DarkMode'

import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className='app__navbar'>
          <div className='app__title'>
            <h1>Fun with AI</h1>
            <a href="https://openai.com/">powered by OpenAI</a>
          </div>
        <DarkMode />
    </nav>
    )
}

export default Navbar