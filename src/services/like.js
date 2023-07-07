import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const like = async (like, { _id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/like/${_id}`
    const res = await Axios.post(url, like, config)
    const { data } = res
    return data
  } catch (error) {
    console.log('No se pudo dar like')
  }
}

export const removeLike = async ({ _id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/like/${_id}`
    const res = await Axios.delete(url, config)
    const { data } = res
    return data
  } catch (error) {
    console.log('No se pudo remover el like')
  }
}

export const removeLikeById = async (id) => {
  try {
    const url = `${BASE_URL}/like/by/${id}`
    await Axios.delete(url)
  } catch (error) {
    console.log('no se eliminaron los likes por id')
  }
}
