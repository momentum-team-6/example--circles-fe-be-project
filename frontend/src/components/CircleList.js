import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { getCircles } from '../api'

function CircleList ({ token }) {
  const [circles, setCircles] = useState([])

  useEffect(() => {
    getCircles(token).then(circles => setCircles(circles))
  }, [token])

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='CircleList'>
      <h2>My Circles</h2>
      <ul>
        {circles.map(circle => (
          <li key={circle.url}>
            {circle.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CircleList
