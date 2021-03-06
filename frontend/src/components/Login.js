import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../api'

function Login ({ isLoggedIn, setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  function handleSubmit (event) {
    event.preventDefault()
    login(username, password)
      .then(data => {
        if (data && data.auth_token) {
          setAuth(username, data.auth_token)
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  return (
    <div className='Login'>
      <h2>Login or <Link to='/register'>Register</Link></h2>
      <form onSubmit={handleSubmit}>
        {errors && (
          <div class='bg-red white pa3'>{errors}</div>
        )}

        <div className='mv2'>
          <label className='db mb2' htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            required
            value={username}
            onChange={evt => setUsername(evt.target.value)}
          />
        </div>

        <div className='mv2'>
          <label className='db mb2' htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
        </div>

        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default Login
