import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async ({ id, likes }) => {
  const data = {
    likes: likes
  }

  await axios.put(
    `${baseUrl}/${id}`,
    data
  )
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios. delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll, create, updateLikes, setToken, remove }