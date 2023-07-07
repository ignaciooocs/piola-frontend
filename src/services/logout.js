import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const Logout = async () => {
  try {
    await Axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true })
  } catch (error) {
    console.log('error en el logout')
  }
}
