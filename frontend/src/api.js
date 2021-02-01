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
      if (error.response) {
        return error.response.data
      }
    })
}
