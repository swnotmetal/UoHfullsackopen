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

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (content, timer) => {
    return dispatch => {
        dispatch(setNotification(content));
        setTimeout(() => {
            dispatch(clearNotification());
        }, timer * 1000)
    }
}


export default notificationSlice.reducer