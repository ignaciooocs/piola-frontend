import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { unsetUser } from '../../reducers/user/userSlice'
import { setLikedUsers } from '../../reducers/likedUsersSlice/likedUsersSlice'
import { unsetProfileUserLoggedIn } from '../../reducers/profileUserLoggedIn/profileUserLoggedIn'
import { setProfileUser, unsetProfileUser } from '../../reducers/profileUser/profileUserSlice'
import { defaultOpenModal, openConfirm, openMenu } from '../../reducers/opnModalSlice/openModal'
import './Navbar.css'
import home from '../../assets/home2.png'
import search from '../../assets/search2.png'
import profile from '../../assets/profile.png'
import notificationsIcon from '../../assets/notifications.png'
import { getUser } from '../../services/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { unsetNotification } from '../../reducers/notificationSlice/notificationSlice'
import { changeClose, confirmClose, deleteClose } from '../../reducers/className/classSlice'
import ConfirmModal from '../confirmModal/ConfirmModal'
import { Logout } from '../../services/logout'
import { motion } from 'framer-motion'

const Navbar = () => {
  // Funcion de dispatch y de navegacion
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  // Traer los estados del reducer
  const { token, username } = useSelector(state => state.user)
  // const { notification } = useSelector(state => state.notification)
  const { menu, deleteAccount, confirm } = useSelector(state => state.openModal)

  const [rotate, setRotate] = useState('')

  const exit = async () => {
    try {
      await Logout()
    } catch (error) {
      console.log('error logout')
    }
  }

  // Cerrar la sesion del usuario
  const logout = () => {
    exit()
    dispatch(unsetUser())
    dispatch(setLikedUsers({
      likedUsers: null
    }))
    dispatch(unsetProfileUserLoggedIn())
    dispatch(unsetProfileUser())
    dispatch(unsetNotification())
    dispatch(openConfirm({ confirm: false }))
    navigate('/')
  }

  // funciones de onClick de cada icono
  const userProfile = async () => {
    dispatch(unsetProfileUser())
    navigate(`/${username}`)
    const res = await getUser(username)
    dispatch(setProfileUser(res))
  }

  const homeOnClick = () => {
    dispatch(unsetProfileUser())
    navigate('/')
  }

  const searchOnClick = () => {
    dispatch(unsetProfileUser())
    navigate('/search')
  }

  const notificationsOnClick = () => {
    dispatch(unsetProfileUser())
    navigate('/notifications')
  }

  // Funcion para abrir y cerrar el nenú del perfil
  const setMenu = () => {
    if (menu) {
      dispatch(changeClose({ classClose: 'closee' }))
      dispatch(deleteClose({ deleteClass: 'closeDelete' }))
      setRotate('')
      setTimeout(() => {
        dispatch(openMenu({ menu: false }))
        dispatch(defaultOpenModal())
        dispatch(deleteClose({ deleteClass: '' }))
      }, 250)
    }
    if (!menu) {
      setRotate('rotate')
      dispatch(changeClose({ classClose: '' }))
      dispatch(openMenu({ menu: true }))
    }
  }

  // funcion para cerrar modal de cerrar sesión
  const cancelAction = () => {
    if (confirm) {
      dispatch(confirmClose({ confirmClass: 'confirmClass' }))
      setTimeout(() => {
        dispatch(openConfirm({ confirm: false }))
        dispatch(confirmClose({ confirmClass: '' }))
      }, 200)
    }
  }

  // clase para saber la ruta en las que estas
  const className = (rute) => {
    return `icon-container ${path === rute && 'border'}`
  }

  return (
    <header>
      <nav>
        {
        path === '/edit/profile'
          ? (
            <NavLink className='icon-container' to={username}>
              <FontAwesomeIcon className='back-icon' icon={faAngleLeft} />
            </NavLink>
            )
          : (path === `/${username}` && token)
              ? (
                <div className='icon-container' onClick={setMenu}>
                  <FontAwesomeIcon className={`back-icon ${rotate}`} icon={menu ? faXmark : faBars} />
                </div>
                )
              : (
                <motion.h1 drag dragConstraints={{ top: -0, left: -0, right: 0, bottom: 0 }} onClick={() => navigate('/')}>Piola</motion.h1>
                )
        }
        {((path !== '/login' && path !== '/register') && token) &&
          <div className='header-icons'>
            <div className={className('/')} onClick={homeOnClick}>
              <img className='home-icon' src={home} />
            </div>
            <div className={className('/search')} onClick={searchOnClick}>
              <img className='search-icon' src={search} />
            </div>
            <div className={className('/notifications')} onClick={notificationsOnClick}>
              <img className='profile-icon' src={notificationsIcon} />
              {/* {notification && <div style={{ height: '10px', width: '10px', borderRadius: '50%', background: '#f55' }} />} */}
            </div>
            <div className={className(`/${username}`)} onClick={userProfile}>
              <img className='profile-icon' src={profile} />
            </div>
          </div>}
      </nav>
      {
      (confirm && !deleteAccount) &&
        <ConfirmModal
          cancelAction={cancelAction}
          cancel='cancelar'
          colorCancel='#2ad'
          accept='cerrar'
          colorAccept='#f55'
          acceptAction={logout}
          text='¿Cerrar sesión?'
        />
      }
    </header>
  )
}

export default Navbar
