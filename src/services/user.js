import Axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const getUser = async (username) => {
  try {
    const url = `${BASE_URL}/users/user/${username}`
    const res = await Axios.get(url)
    const { data } = res
    return data
  } catch (error) {
    console.log('ocurrio un error al obtener al usuario')
  }
}

export const getUserById = async (id) => {
  try {
    const url = `${BASE_URL}/users/${id}`
    const res = await Axios.get(url)
    const { data } = res
    return data
  } catch (error) {
    console.log('ocurrio un error al obtener al usuario')
  }
}

export const editUser = async (content, { _id, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/users/${_id}`
    const res = await Axios.put(url, content, config)
    const { data } = res
    return data
  } catch (error) {
    console.log('error al actualizar al usuario')
    console.log(error.response.data.error)
  }
}

export const deleteUser = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${BASE_URL}/users`
    await Axios.delete(url, config)
  } catch (error) {
    console.log('no se elimino el usuario')
  }
}

export const getLikedUsers = async (id) => {
  try {
    const url = `${BASE_URL}/users/liked/${id}`
    const res = await Axios.get(url)
    const { data } = res
    return data
  } catch (error) {
    console.log('ocurrio un error al obtener al usuario')
  }
}

export const getNotifications = async (id) => {
  try {
    const url = `${BASE_URL}/users/notifications/${id}`
    const res = await Axios.get(url)
    const { data } = res
    return data
  } catch (error) {
    console.log('ocurrio un error al obtener las notificaciones')
  }
}
