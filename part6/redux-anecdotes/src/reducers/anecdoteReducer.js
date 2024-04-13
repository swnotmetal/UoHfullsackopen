import { createSlice } from  '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { showNotification } from '../reducers/notificationReducer'

const anecdoteSlice  = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    /*voteAnecdotes(state, action) {
      const { id } = action.payload
      console.log('id being voted is', id);
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id);
      if (anecdoteToUpdate) {
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
        )
      }
      return state
    },*/
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
    
    
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnec = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService. getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService. createNew(content)
    dispatch(appendAnecdote(newAnec))
    dispatch(showNotification(`You have added "${content}"`, 5))
  }
}

export const castingVotes = (anecdote) => {
  return async dispatch => {
    await anecdoteService. updateVotes(anecdote)
    const votedAnec = await anecdoteService.getAll()
    dispatch(setAnecdotes(votedAnec))
    dispatch(showNotification(`You have voted for "${anecdote.content}"`, 5))
  }
}
export default anecdoteSlice.reducer