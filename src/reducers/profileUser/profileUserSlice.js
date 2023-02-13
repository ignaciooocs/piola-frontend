import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  username: '',
  biography: '',
  comments: null,
  likes: null,
  liked: null,
  picture: '',
  notifications: null,
  stories: null
}

export const profileUserSlice = createSlice({
  name: 'profileUser',
  initialState,
  reducers: {
    setProfileUser: (state, action) => {
      state._id = action.payload._id
      state.username = action.payload.username
      state.biography = action.payload.biography
      state.comments = action.payload.comments
      state.likes = action.payload.likes
      state.liked = action.payload.liked
      state.picture = action.payload.picture
      state.notifications = action.payload.notifications
      state.stories = action.payload.stories
    },
    unsetProfileUser: (state) => {
      state._id = ''
      state.username = ''
      state.biography = ''
      state.comments = null
      state.likes = null
      state.liked = null
      state.picture = null
      state.notifications = null
      state.stories = null
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments
    }
  }
})

export const { setProfileUser, unsetProfileUser, setComments } = profileUserSlice.actions
export default profileUserSlice.reducer
