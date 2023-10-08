import axios from './index.js'

export default async (request) => {
  let response
  try {
    response = await axios(request.token).get(`/emergencies/${request.body.emergencies_id}`, {})
  } catch (err) {
    return err
  }

  return response
}