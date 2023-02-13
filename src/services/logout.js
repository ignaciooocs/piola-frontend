import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const Logout = async () => {
  try {
    const res = await Axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true })
    console.log(res)
  } catch (error) {
    console.log('error en el logout')
  }
}
