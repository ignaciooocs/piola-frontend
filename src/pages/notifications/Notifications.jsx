import { useSelector, useDispatch } from 'react-redux'
import notPicture from '../../assets/not-picture2.png'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import './Notifications.css'
import { unsetProfileUser } from '../../reducers/profileUser/profileUserSlice'
import { formatDate } from '../../utils/functions'
import useGetNotifications from '../../hooks/useGetNotifications'
import { motion } from 'framer-motion'

const Notifications = () => {
  useGetNotifications()
  // Se crea funcion de dispatch
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // traer los estados del reducer
  const { notification } = useSelector(state => state.notification)

  // función que te lleva al perfil del usuario el cual te a llegado la notificación
  const notificationsOnClick = (user) => {
    dispatch(unsetProfileUser())
    navigate(`/${user}`)
  }

  return (
    <div className='Notification'>
      <h3 className='notification-title'>Notificaciónes</h3>
      {!notification && <Loading />}
      {notification?.length === 0 && <p>No tienes notificaciónes</p>}
      {notification &&
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='notifications-container'>
          {notification?.map(notification => (
            <li onClick={() => notificationsOnClick(notification.username)} className='notification-item' key={notification.id}>
              <div className='user-notification-container'>
                <div className='container-pictures-notification'>
                  {!notification.picture
                    ? <img className='user-picture-notification' src={notPicture} />
                    : <img className='user-picture-notification' src={`http://localhost:5000/profile-picture/${notification.picture}`} />}
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
