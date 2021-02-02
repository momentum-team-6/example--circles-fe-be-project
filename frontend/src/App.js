import 'tachyons'
import Login from './components/Login'
import { useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
import Register from './components/Register'
import CircleList from './components/CircleList'

function App () {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  const isLoggedIn = (username && token)

  return (
    <Router>
      <div className='App sans-serif mw8 center mv3 ph2'>
        <header className='NavBar'>
          <div className='pv2 flex items-center'>
            <div className='flex flex-auto items-center justify-between'>
              <h1 className='f2 ma0 pa0 lh-solid'>
                <Link to='/' className='no-underline black'>Circles</Link>
              </h1>
              <div className='lh-solid pr3'>
                {
                  isLoggedIn
                    ? (
                      <span>Hello, {username}! <button onClick={() => setToken(null)}>Log out</button></span>
                      )
                    : (
                      <span>
                        <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
                      </span>
                      )
                }
              </div>
            </div>
          </div>
        </header>

        <div className='pv2'>
          <Switch>
            <Route path='/login'>
              <Login isLoggedIn={isLoggedIn} setAuth={setAuth} />
            </Route>
            <Route path='/register'>
              <Register isLoggedIn={isLoggedIn} setAuth={setAuth} />
            </Route>
            <Route path='/'>
              <CircleList token={token} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
