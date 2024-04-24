import { createSlice } from  '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        removeBlogs ( state, action) {
            return state.filter(blog => blog.id !== action.payload)
        }
    }
})

export const {appendBlogs, setBlogs, removeBlogs} = blogSlice.actions

export const initialBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlogs = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlogs(newBlog))
    }
}

export const deleteBlogs = (id) => {
    return async dispatch => {
      const response = await blogService.remove(id)
      dispatch(removeBlogs(id))
      return response
    }
  }
  

export const castingLikes= (id) => {
    return async dispatch => {
        await blogService. updateLikes(id)
        const likedBlog = await blogService.getAll()
        dispatch(setBlogs(likedBlog))
    }
}
export default blogSlice.reducer