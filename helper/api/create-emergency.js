import axios from "./index.js"

export default async (receiverId, req) => {
  const request = await axios(req.token).post(`/users/${receiverId}/emergencies`, {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  })

  return request.data.data
}