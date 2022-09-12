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
      <h2 className='form__header'>Enter a prompt below and the AI engine will craft a response that is indistinguishable from human writing in most cases</h2>
      <form className='form' onSubmit={event => event.preventDefault()} autoComplete="off">
        <textarea
          value={prompt}
          onChange={(event) => {
            setPrompt(event.target.value)
          }}
          className="form__textarea"
          name="prompt"
          type="text"
          placeholder="Enter prompt e.g. Write a job application for a fullstack developer job"
          disabled={props.disabled}
        />
      </form>
      <div className='button__container'>
      <Button onClick={props.clearResponses} disabled={!props.responses.length} >Clear responses</Button>
      <Button onClick={handleClick} disabled={!prompt} >Submit</Button>
      </div>
    </div>
  )
}

export default Form