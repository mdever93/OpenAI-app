import React from 'react'
import Prompt from './Prompt'
import Response from './Response'

import './ResponseContainer.scss'

const ResponseContainer = (props) => {
  return (
    <div className='response__container'>
      {props.children}
    </div>
  )
}

export default ResponseContainer