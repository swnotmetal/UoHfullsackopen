import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnec } from './reducers/anecdoteReducer'



const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {    
    dispatch(initializeAnec())   
  }, []) 

  return (
    <div>
    <Notification />
    <AnecdoteList />
    <Filter />
    <AnecdoteForm />
    
    </div>
  )
}

export default App