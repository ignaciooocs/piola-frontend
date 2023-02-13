import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationSlice/notificationSlice'
import { getUserById } from '../services/user'

const useGetNotifications = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // traer los estados del reducer
  const { notifications } = useSelector(state => state.profileUserLoggedIn)
  const { notification } = useSelector(state => state.notification)
  const { token } = useSelector(state => state.user)

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    getNotifications()
  }, [notifications])

  // función para traer los datos de los usuarios los cuales te llegan notificaciónes (Se puede llevar a un hook)
  const getNotifications = async () => {
    try {
      if (notifications) {
        const notificaciones = []
        for (const userId of notifications) {
          const res = await getUserById(userId.fromUser)
          const newNotificacion = {
            username: res.username,
            picture: res.picture,
            id: userId._id,
            createdAt: userId.createdAt
          }
          notificaciones.push(newNotificacion)
        }
        dispatch(setNotification({
          notification: notificaciones
        }))
        console.log(notification)
      }
    } catch (error) {
      console.log('error con los usuarios gustados')
    }
  }
}

export default useGetNotifications
