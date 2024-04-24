import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogForm = () => {
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlogs(newBlog))
    setNewBlog({ title: '', author: '', url: '' })
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleChange}
            placeholder='enter title here'
            data-testid='title'
            id='title'
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
            placeholder='who wrote the blog?'
            data-testid='author'
            id='author'
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
            placeholder='enter url here'
            data-testid='url'
            id='url'
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm;
