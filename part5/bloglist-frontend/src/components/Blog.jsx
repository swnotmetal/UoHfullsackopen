import React, { useState, forwardRef, useImperativeHandle } from "react";


const Blog = forwardRef(({blog, user, addingLikes, deleteBlog}, ref) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))

  const handleLike = (event) => {
    event.preventDefault()
    addingLikes({
      id: blog.id, 
      likes: blog.likes + 1
    })
  }
 const handleDelete = async() => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    await deleteBlog(blog.id)
  } 
 }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p> Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}
        <button onClick={handleLike} id="like-button">like</button>
        </p>
        <p>{blog.user!== null && blog.user.name}</p>
        {user && blog.user && user.name === blog.user.name && (
          <button onClick={handleDelete} id="remove-button">
                    remove
                </button>
)}
      </div>
    </div>
  )
})
Blog.displayName = "Blog"
export default Blog;
