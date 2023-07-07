import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const register = async (content, state) => {
  try {
    const url = `${BASE_URL}/auth/register`
    const res = await Axios.post(url, content)
    return res.data
  } catch (error) {
    state(error.response.data.error)
    state(error.response.data.errors[0].msg)
  }
}
