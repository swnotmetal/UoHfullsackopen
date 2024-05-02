import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'


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
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 1))
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleChange}
            placeholder='enter title here'
            data-testid='title'
            id='title'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
            placeholder='who wrote the blog?'
            data-testid='author'
            id='author'
          />
        </Form.Group>
        <Form.Group>
         <Form.Label>URL:</Form.Label> 
          <Form.Control
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
            placeholder='enter url here'
            data-testid='url'
            id='url'
          />
        </Form.Group>
        <Button variant='primary' type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm;
