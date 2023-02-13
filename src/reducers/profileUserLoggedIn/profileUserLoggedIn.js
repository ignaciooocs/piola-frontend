import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  username: '',
  biography: '',
  comments: [],
  likes: [],
  liked: null,
  picture: null,
  notifications: null,
  stories: null
}

export const profileUserLoggedInSlice = createSlice({
  name: 'profileUserLoggedIn',
  initialState,
  reducers: {
    setProfileUserLoggedIn: (state, action) => {
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
    unsetProfileUserLoggedIn: (state) => {
      state._id = ''
      state.username = ''
      state.biography = ''
      state.comments = []
      state.likes = []
      state.liked = null
      state.picture = null
      state.notifications = null
      state.stories = null
    }
  },
  addStory: (state, action) => {
    state.stories.push(action.payload)
  }
})

export const { setProfileUserLoggedIn, unsetProfileUserLoggedIn, addStory } = profileUserLoggedInSlice.actions
export default profileUserLoggedInSlice.reducer
