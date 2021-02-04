import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api'
})

export function login (username, password) {
  return API
    .post('auth/token/login/', {
      username: username,
      password: password
    })
    .then(res => res.data)
    .catch(error => {
      let errors = []
      if (error.response) {
        if (error.response.data.non_field_errors) {
          errors = errors.concat(error.response.data.non_field_errors)
        }
      }
      if (errors.length === 0) {
        errors.push('There was a problem registering.')
      }
      throw new Error(errors[0])
    })
}

export function register (username, password) {
  return API
    .post('auth/users/', {
      username: username,
      password: password
    })
    .then(res => {
      return login(username, password)
    })
    .catch(error => {
      let errors = []
      if (error.response) {
        const data = error.response.data
        if (data.username) {
          errors = errors.concat(data.username)
        }
        if (data.password) {
          errors = errors.concat(data.password)
        }
      }

      if (errors.length === 0) {
        errors.push('There was a problem registering.')
      }

      // The Error object in JS is an actual error.
      // We can trigger them by throwing a new Error.
      const err = new Error(errors[0]) // Errors take a string message.
      // err.errors = errors // Test this later.
      throw err
    })
}

export function getCircles (token) {
  return API
    .get('circles/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function getCircle (token, pk) {
  return API
    .get(`circles/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function createCircle (token, name) {
  return API.post('circles/', {
    name: name
  }, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then(res => res.data)
}

export function updateCircle (token, pk, fields) {
  return API.patch(`circles/${pk}/`, fields, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then(res => res.data)
}
