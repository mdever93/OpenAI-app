import React from 'react'

import './Response.scss'

const Response = (props) => {
  return (
    <div className='response'>
      {props.children}
    </div>
  )
}

export default Response