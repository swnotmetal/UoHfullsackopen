import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../request/request'

import { useNotificationDispatch } from '../contexts/notificationContext'

const BlogForm = () => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()
    const newBlogMutation = useMutation({
        mutationFn: create,
        onSuccess: (newBlogObj) => {
            const blogs = queryClient.getQueryData(['blogs' ])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlogObj))
        } 
    })

    const onCreate = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
        console.log('new blog')
        newBlogMutation.mutate({
            title,
            author,
            url,
            likes: 0
        })
        dispatch({ type: 'CREATE', payload: `you have added '${title}'`})
        setTimeout(() => {
            dispatch({type: 'TIMEOUT'})
        }, 5000);
        
     
    }

    return (
        <div>
            <h3>Create a new blog</h3>
            <form onSubmit={onCreate}>
                <div>
                Title:
                <input 
                name='title'
                type='text'
                placeholder='enter your title here'
                 />
                </div>

                <div>
                <div>
                Author:
                <input 
                name='author'
                type='text'
                placeholder='enter author name here'
                 />
                </div>
                <div>
                URL:
                <input 
                name='url'
                type='text'
                placeholder='enter your url'
                 />
                </div>
                </div>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    )
}

export default BlogForm