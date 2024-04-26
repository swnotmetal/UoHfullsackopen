import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const updateLikes = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

/*export const updateLikes = async (blog) => {
  const newVotes = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newVotes)
  return response.data
}*/

export const remove = async (deletedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${deletedBlog.id}`, config)

  return response.data
}

export const login = async credentials => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}