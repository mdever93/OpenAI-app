import React from 'react'

import './Response.scss'

const Response = (props) => {
  return (
    <div className={`response ${props.response && 'visible'}`}>
      {props.response}
    </div>
  )
}

export default Response