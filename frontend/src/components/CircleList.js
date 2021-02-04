import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getCircles } from '../api'
import CreateCircle from './CreateCircle'

function CircleList ({ token }) {
  const [circles, setCircles] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  useEffect(updateCircles, [token])

  function updateCircles () {
    getCircles(token).then(circles => setCircles(circles))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='CircleList'>
      <h2>My Circles</h2>
      <div>
        {isCreating
          ? <CreateCircle
              token={token} handleDone={(newCircle) => {
                setIsCreating(false)
                setCircles([...circles, newCircle])
              }}
            />
          : (<button onClick={() => setIsCreating(true)}>Create new circle</button>)}

      </div>
      <ul>
        {circles.map(circle => (
          <li key={circle.url}>
            <Link to={`/c/${circle.pk}`}>{circle.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CircleList
