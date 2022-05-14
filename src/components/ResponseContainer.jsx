import React from 'react'
import Prompt from './Prompt'
import Response from './Response'

import './ResponseContainer.scss'

const ResponseContainer = (props) => {
  return (
    <div className='response__container'>
      <Prompt>{props.prompt}</Prompt>
      <Response response={props.response} />
      {/* {props.children} */}
    </div>
  )
}

export default ResponseContainer