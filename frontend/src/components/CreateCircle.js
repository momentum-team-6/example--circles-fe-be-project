import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createCircle } from '../api'

function CreateCircle ({ token, handleDone }) {
  const [name, setName] = useState('')

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleSubmit (event) {
    event.preventDefault()
    createCircle(token, name)
      .then(circle => {
        handleDone(circle)
      })
  }

  return (
    <div className='CreateCircle'>
      <form onSubmit={handleSubmit}>
        <div className='mv2'>
          <label className='db mb2' htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            required
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
        </div>

        <div className='mv2'>
          <button type='submit'>Make new circle</button>
        </div>
      </form>
    </div>
  )
}

export default CreateCircle
