import { createSlice } from  '@reduxjs/toolkit'
import blogService from '../services/blogs'


const commentSlice = createSlice({
    name: 'comment',
    initialState: [
        { id: '1', content: 'This is a great blog post!' },
        { id: '2', content: 'I learned a lot from this.' },
        { id: '3', content: 'Very informative and well-written.' },
        { id: '4', content: 'Thanks for sharing this!' },
        { id: '5', content: 'Bush did 911.' }
    ],
    reducers: {
        appendComments(state, action) {
            state.push(action.payload)
        },
        setComments(state,action) {
            return action.payload // this only returns fetched comments.
            //return [...state, ...action.payload]  Append the fetched comments to the state instead of replacing it
        }
    }
})

export const {appendComments, setComments} = commentSlice.actions

export const loadComments = ({id}) => {
    return async dispatch => {
        const comments = await blogService.getComment(id)
        dispatch(setComments(comments))
    }
}

export const addComments = (id, commentContent) => {
    
    return async dispatch => {
        await blogService.toComment(id, commentContent)
        dispatch(loadComments({ id }))
    }
}

export default commentSlice.reducer