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

let timeoutId

export const showNotification = (content, timer) => {
  return dispatch =>  {
    dispatch(setNotification(content))

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timer * 5000)
  }
}


export default notificationSlice.reducer