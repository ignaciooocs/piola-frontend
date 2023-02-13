import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: null },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload.notification
    },
    unsetNotification: (state) => {
      state.notification = null
    }
  }
})

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer
