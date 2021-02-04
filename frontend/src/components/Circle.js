import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCircle, updateCircle } from '../api'

function Circle ({ token }) {
  const { pk } = useParams()
  const [circle, setCircle] = useState()
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    getCircle(token, pk)
      .then(c => setCircle(c))
  }, [pk, token])

  function handleNameUpdate (event) {
    event.preventDefault()
    setIsEditing(false)
    updateCircle(token, pk, { name: newName })
      .then(c => setCircle(c))
  }

  const editingComponent = (
    <form onSubmit={handleNameUpdate}>
      <input type='text' value={newName} onChange={e => setNewName(e.target.value)} />
      <button type='submit'>Update name</button>
    </form>
  )

  return (
    <div className='Circle'>
      {circle && (
        <>
          <h2>
            Circle {circle.name}
            <span className='ml3 f6'>
              <button onClick={() => setIsEditing(true)}>Edit name</button>
            </span>
          </h2>
          {isEditing && editingComponent}
          <p>
            <Link to='/'>Go back to all circles</Link>
          </p>
          <div>
            Members: {circle.memberships.length}
          </div>
        </>
      )}
    </div>
  )
}

export default Circle
