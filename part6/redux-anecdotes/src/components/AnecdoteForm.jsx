import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'



const AnecdoteForm = () => {
   
    const dispatch = useDispatch()

    const addAnecdotes = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value 
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
    }
  
   
    return (
        <div>
    
            <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div><input name="anecdote" /></div>
        <button type='sumbit'>create</button>
      </form>
        </div>
    )

}

export default AnecdoteForm