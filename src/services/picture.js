import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const deletePicture = async (picture, { token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/profile/image/${picture}`
    const res = await Axios.delete(url, config)
    console.log(res)
  } catch (error) {
    console.log('no se elimino la imagen')
  }
}
