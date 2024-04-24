import { createSlice } from  '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'


const authenticationSlice = createSlice({
    name: ' authentication',
    initialState: [],
    reducers: {
        userAuthentication(state, action) {
            return action.payload
        },
        userLogin(state, action) {
            return action.payload
        },
        userLogout(state, action) {
            return null
        }
    }
})

export const {userAuthentication, userLogin, userLogout} = authenticationSlice.actions

export const userInitial = () => {
    return async dispatch  => {
        const loggedUserJSON =
        window.localStorage.getItem('loggedBlogUser')
          if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(userAuthentication(user))
            blogService.setToken(user.token)
          }
    }
}

export const logIn = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(userLogin(user))
            dispatch(setNotification(`${user.username} has logged in`, 5))

        }
        catch(exception) {
            dispatch(setNotification('Wrong username or password', 5))
        }
    }
}

export const logOut = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(userLogout())
    }
}

export default authenticationSlice.reducer