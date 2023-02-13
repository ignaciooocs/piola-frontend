import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const postStorie = async (content, { token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/storie`
    const res = await Axios.post(url, content, config)
    return res.data
  } catch (error) {
    console.log(error)
    console.log('Ocurrio un error al crear una historia')
  }
}

export const deleteStories = async (storieId, { token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const res = await Axios.delete(`${BASE_URL}/storie/${storieId}`, config)
    console.log(res)
  } catch (error) {
    console.log('no se elimino la historia')
  }
}
