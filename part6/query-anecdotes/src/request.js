import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnec = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnec = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

export const updateVotes = async (anecdote) => {
  const newVotes = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newVotes)
  return response.data
}
