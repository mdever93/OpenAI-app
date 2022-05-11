import React from 'react'

import './Prompt.scss'

const Prompt = (props) => {
  return (
    <div className='prompt'>
      {props.children}
    </div>
  )
}

export default Prompt