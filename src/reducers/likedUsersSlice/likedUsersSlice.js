import { createSlice } from '@reduxjs/toolkit'

const likedUsersSlice = createSlice({
  name: 'likedUsers',
  initialState: { likedUsers: null },
  reducers: {
    setLikedUsers: (state, action) => {
      state.likedUsers = action.payload.likedUsers
    },
    unsetLikedUsers: (state) => {
      state.likedUsers = null
    }
  }
})

export const { setLikedUsers, unsetLikedUsers } = likedUsersSlice.actions
export default likedUsersSlice.reducer
