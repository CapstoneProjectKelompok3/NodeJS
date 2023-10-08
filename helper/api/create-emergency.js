import axios from "./index.js"

export default async (receiverId, req) => {
  return await axios(req.token).post(`/users/${receiverId}/emergencies`, {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  })
}