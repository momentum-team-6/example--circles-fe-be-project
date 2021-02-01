import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api/auth'
})

export function login (username, password) {
  return API
    .post('/token/login/', {
      username: username,
      password: password
    })
    .then(res => res.data)
    .catch(error => {
      console.log({ error })
      if (error.response) {
        if (error.response.data.non_field_errors) {
          throw new Error(error.response.data.non_field_errors.join(' '))
        }
      }
      throw new Error('There was an issue logging in.')
    })
}
