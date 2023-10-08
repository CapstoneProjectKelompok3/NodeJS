import axios from "axios"
import 'dotenv/config'

export default (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `application/json`
    },
    responseType: 'json',
    responseEncoding: 'utf8'
  })
}