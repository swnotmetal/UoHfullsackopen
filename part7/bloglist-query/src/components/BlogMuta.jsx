import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateLikes, remove } from '../request/request'
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useNotificationDispatch } from '../contexts/notificationContext'
import { useUserValue } from '../contexts/userContext';


const Blog = forwardRef(({ blog }, ref) => {
  const [visible, setVisible] = useState(false)
  const user = useUserValue()
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const giveLikeMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (likesGiven) => {
      const blogs = queryClient.getQueriesData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === likesGiven.id ? likesGiven : b))
      )
    },
    onError: (error) => {
      console.error('Error liking blog:', error)
    }
  })

  const handleLikes = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    giveLikeMutation.mutate(updatedBlog)
    await dispatch({
      type: 'LIKE',
      payload: `You liked '${blog.title}'`
    })
    setTimeout(() => {
      dispatch({ type: 'TIMEOUT' })
    }, 5000)
  }

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: (deletedBlog) => {
      const currentBlogs = queryClient.getQueryData('blogs')
      if (currentBlogs) {
        const updatedBlogs = currentBlogs.filter((b) => b.id !== deletedBlog.id)
        queryClient.setQueryData('blogs', updatedBlogs)
      }
    },
    onError: (error) => {
      console.error('Error deleting blog:', error)
    }
  })

  const handleDelete = async () => {
    if (
      window.confirm(
        `Do you want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        deleteMutation.mutate(blog, {
          onSuccess: () => {
            queryClient.invalidateQueries('blogs')
          }
        })
        await dispatch({
          type: 'REMOVE',
          payload: `You have deleted: ${blog.title}`
        })
        setTimeout(() => {
          dispatch({ type: 'TIMEOUT' })
        }, 5000)
      } catch (error) {
        await dispatch({
          type: 'ERROR',
          payload: `${error.response.status} has occurred`
        })
        setTimeout(() => {
          dispatch({ type: 'TIMEOUT' })
        }, 5000)
      }
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='whenHidden'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='whenShown'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLikes}>likes</button>
        </p>
        <p>{blog.user !== null && blog.user.name}</p>
        {blog.user?.username === user?.username && (
          <button onClick={handleDelete} id='remove-button'>
            remove
          </button>
        )}
      </div>
    </div>
  )
})

export default Blog
