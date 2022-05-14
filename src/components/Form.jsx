import React, { useState } from 'react'
import { Button } from './Button'

import './Form.scss'


const Form = (props) => {
  const [prompt, setPrompt] = useState('')

  const handleClick = () => {
    props.getPrompt(prompt)
    setPrompt('')
  }
  return (
    <div className='form__container'>
      <p className='p-text'>Form</p>
      <form className='form' onSubmit={event => event.preventDefault()} autoComplete="off">
        <textarea
          value={prompt}
          onChange={(event) => {
            setPrompt(event.target.value)
          }}
          className="form__textarea"
          name="prompt"
          type="text"
          placeholder="Enter prompt"
          disabled={props.disabled}
        />
      </form>
      <div className='button__container'>
      <Button onClick={handleClick} disabled={!prompt} >Submit</Button>
      </div>
    </div>
  )
}

export default Form