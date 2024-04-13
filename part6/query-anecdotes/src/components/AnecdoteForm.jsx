import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnec } from '../request'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecMutation = useMutation({
    mutationFn: createAnec,
    onSuccess: (newAnec) => {
      const anecs = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecs.concat(newAnec))
    },
    onError: () => {
      dispatch({ type: 'ERROR', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecMutation.mutate({
      content,
      votes: 0
    })
    dispatch({ type: 'ADD', payload: `you have added '${content}'` },
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT' })
      }, 5000)
    )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
