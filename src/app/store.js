import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user/userSlice'
import profileUserReducer from '../reducers/profileUser/profileUserSlice'
import likedUsersSlice from '../reducers/likedUsersSlice/likedUsersSlice'
import profileUserLoggedInReducer from '../reducers/profileUserLoggedIn/profileUserLoggedIn'
import openModalReducer from '../reducers/opnModalSlice/openModal'
import notificationReducer from '../reducers/notificationSlice/notificationSlice'
import classNameReducer from '../reducers/className/classSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    profileUser: profileUserReducer,
    likedUsers: likedUsersSlice,
    profileUserLoggedIn: profileUserLoggedInReducer,
    openModal: openModalReducer,
    notification: notificationReducer,
    className: classNameReducer
  }
})
