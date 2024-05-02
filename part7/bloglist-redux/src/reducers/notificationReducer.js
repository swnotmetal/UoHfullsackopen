import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const  { setNotification, clearNotification } = notificationSlice.actions


export const showNotification = (text, timeout) => {
  return dispatch => {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    },timeout * 3000)
  }
}


export default notificationSlice.reducer