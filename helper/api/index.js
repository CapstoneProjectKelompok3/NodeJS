import axios from "axios"

export default (token) => {
  return axios.create({
    baseURL: 'https://belanjalagiyuk.shop',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `application/json`
    },
    responseType: 'json',
    responseEncoding: 'utf8'
  })
}