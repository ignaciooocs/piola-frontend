import { createSlice } from '@reduxjs/toolkit'

const classSlice = createSlice({
  name: 'class',
  initialState: {
    classClose: '',
    confirmClass: '',
    deleteClass: ''
  },
  reducers: {
    changeClose: (state, action) => {
      state.classClose = action.payload.classClose
    },
    confirmClose: (state, action) => {
      state.confirmClass = action.payload.confirmClass
    },
    deleteClose: (state, action) => {
      state.deleteClass = action.payload.deleteClass
    }
  }
})

export const { changeClose, confirmClose, deleteClose } = classSlice.actions
export default classSlice.reducer
