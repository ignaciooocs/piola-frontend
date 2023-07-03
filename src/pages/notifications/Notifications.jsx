import { useSelector } from 'react-redux'
import notPicture from '../../assets/not-picture2.png'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import './Notifications.css'
import { formatDate } from '../../utils/functions'
import { motion } from 'framer-motion'
import { getNotifications } from '../../services/user'
import { useQuery } from '@tanstack/react-query'

const Notifications = () => {
  // Se crea funcion de dispatch
  const navigate = useNavigate()

  const { id } = useSelector(state => state.user)

  const get = async () => {
    return await getNotifications(id)
  }

  const { data: notification, isLoading, error } = useQuery({
    queryFn: get,
    queryKey: ['Notifications'],
    onSuccess: () => {
      console.log('Notificaciones obtenidas')
    }
  })

  // función que te lleva al perfil del usuario el cual te a llegado la notificación
  const notificationsOnClick = (user) => {
    navigate(`/${user}`)
  }

  if (isLoading) return <Loading />
  if (error) return <p>error: {error}</p>
  return (
    <div className='Notification'>
      <h3 className='notification-title'>Notificaciones</h3>
      {notification?.length === 0 && <p>No tienes notificaciónes</p>}
      {notification &&
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='notifications-container'>
          {notification?.map(notification => (
            <li onClick={() => notificationsOnClick(notification.username)} className='notification-item' key={notification._id}>
              <div className='user-notification-container'>
                <div className='container-pictures-notification'>
                  {!notification.picture
                    ? <img className='user-picture-notification' src={notPicture} />
                    : <img className='user-picture-notification' src={notification.picture} />}
                </div>
                <p className='notification-content'>A <b>{notification.username}</b> le ha gustado tu perfil</p>
              </div>
              <div className='date-notification'>{formatDate(notification.createdAt)}</div>
            </li>
          )).reverse()}
        </motion.ul>}
    </div>
  )
}

export default Notifications
