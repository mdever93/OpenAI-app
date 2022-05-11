import React, { useState } from 'react'
import { Button } from './Button'

import './Form.scss'


const Form = () => {
  const [prompt, setPrompt] = useState('')
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
          name="name"
          type="text"
          placeholder="Enter prompt"
        />
      </form>
      <div className='button__container'>
      <Button onClick={console.log('Submit')} >Submit</Button>
      </div>
    </div>
  )
}

export default Form