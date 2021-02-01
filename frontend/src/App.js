import 'tachyons'
import Login from './components/Login'
import { useState } from 'react'

function App () {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  return (
    <div className='App sans-serif mw8 center mv3 ph2'>

      <header className='NavBar'>
        <div className='pv2 flex items-center'>
          <div className='flex flex-auto items-center justify-between'>
            <h1 className='f2 ma0 pa0 lh-solid'>
              <span className='no-underline black'>Circles</span>
            </h1>
          </div>
        </div>
      </header>

      <div class='pv2'>
        {
          token
            ? (
              <div>Logged in as {username}</div>
              )
            : <Login setAuth={setAuth} />
        }

      </div>

    </div>
  )
}

export default App
