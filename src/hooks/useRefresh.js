import Axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const useRefresh = (action) => {
  const dispatch = useDispatch()

  useEffect(() => {
    refreshToken()
  }, [])

  const setTime = () => {
    setTimeout(() => {
      refreshToken()
      console.log('Se refrescó el token')
    }, 1000 * 60 * 12)
  }

  const refreshToken = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/auth/refresh`, { withCredentials: true })
      dispatch(action(res.data))
      setTime()
    } catch (error) {
      console.log('ocurrio un error en refresh')
    }
  }
}
