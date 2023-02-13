import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const login = async (userLogin, state) => {
  try {
    const url = `${BASE_URL}/auth/login`
    const res = await Axios.post(url, userLogin, { withCredentials: true })
    const { data } = res
    return data
  } catch (error) {
    console.log(error.response.data)
    state(error.response.data.error)
  }
}
