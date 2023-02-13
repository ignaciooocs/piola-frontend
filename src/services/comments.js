import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const postComment = async (content, { _id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/comment/${_id}`
    const res = await Axios.post(url, content, config)
    const { data } = res
    return data
  } catch (error) {
    console.log('error al crer un nuevo comentario')
  }
}

export const deleteCommets = async (id, { token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/comment/${id}`
    await Axios.delete(url, config)
  } catch (error) {
    console.log('No se elimino el comentario')
  }
}

export const getCommentById = async (id) => {
  try {
    const url = `${BASE_URL}/comment/${id}`
    const res = await Axios.get(url)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
