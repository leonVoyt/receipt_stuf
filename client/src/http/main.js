import axios from 'axios'

let $host = ''

if (process.env.REACT_APP_MODE === 'development') {
  $host = axios.create({
    baseURL: process.env.REACT_APP_API_CLIENT_URL,
  })
} else {
  $host = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL,
  })
}

export { $host }
