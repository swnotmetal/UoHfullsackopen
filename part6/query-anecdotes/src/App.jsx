import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnec, updateVotes } from './request'
import { useNotificationDispatch } from './notificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newVoteMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: (updatedAnec) => {
      const anecs = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecs.map(anec =>
        anec.id === updatedAnec.id ? updatedAnec : anec
      ))
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    newVoteMutation.mutate({ ...anecdote })
    dispatch({ type: 'VOTE', payload: `You have voted for '${anecdote.content}'` },
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT' })
      }, 5000)
    )
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnec,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
