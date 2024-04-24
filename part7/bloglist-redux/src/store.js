import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import authenReducer from './reducers/authenReducer'

const store = configureStore({
    reducer: {

        notification: notificationReducer,
        blogs: blogReducer,
        users: userReducer,
        authenUser: authenReducer
    }
})

store.subscribe(()=>{console.log(store.getState())}) 

export default store