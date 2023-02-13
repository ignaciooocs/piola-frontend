import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  token: null,
  id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username
      state.token = action.payload.token
      state.id = action.payload.id
    },
    unsetUser: (state) => {
      state.username = ''
      state.token = null
      state.id = ''
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions
export default userSlice.reducer
