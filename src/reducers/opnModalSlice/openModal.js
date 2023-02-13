import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editUsername: false,
  editPicture: false,
  editBiography: false,
  editPassword: false,
  deleteAccount: false,
  loading: false,
  menu: false,
  confirm: false,
  storie: false,
  preStorie: false
}

const openModalSlice = createSlice({
  name: 'openModal',
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.editUsername = action.payload.editUsername
      state.editPicture = action.payload.editPicture
      state.editBiography = action.payload.editBiography
      state.editPassword = action.payload.editPassword
      state.deleteAccount = action.payload.deleteAccount
      state.loading = action.payload.loading
      state.menu = action.payload.menu
      state.storie = action.payload.storie
      state.preStorie = action.payload.preStorie
    },
    defaultOpenModal: (state) => {
      state.editUsername = false
      state.editPicture = false
      state.editBiography = false
      state.editPassword = false
      state.deleteAccount = false
      state.loading = false
      state.menu = false
      state.storie = false
      state.preStorie = false
    },
    openUsername: (state, action) => {
      state.editUsername = action.payload.editUsername
    },
    openPicture: (state, action) => {
      state.editPicture = action.payload.editPicture
    },
    openBiography: (state, action) => {
      state.editBiography = action.payload.editBiography
    },
    openPassword: (state, action) => {
      state.editPassword = action.payload.editPassword
    },
    openDeleteAccount: (state, action) => {
      state.deleteAccount = action.payload.deleteAccount
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading
    },
    openMenu: (state, action) => {
      state.menu = action.payload.menu
    },
    openConfirm: (state, action) => {
      state.confirm = action.payload.confirm
    },
    openStorie: (state, action) => {
      state.storie = action.payload.storie
    },
    openPreStorie: (state, action) => {
      state.preStorie = action.payload.preStorie
    }
  }
})

export const {
  setOpenModal,
  defaultOpenModal,
  openUsername,
  openBiography,
  openPicture,
  openPassword,
  openDeleteAccount,
  setLoading,
  openMenu,
  openConfirm,
  openStorie,
  openPreStorie
} = openModalSlice.actions
export default openModalSlice.reducer
