import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileUser } from '../../reducers/profileUser/profileUserSlice'
import { getUser } from '../../services/user'
import PostComment from '../../components/postComment/PostComment'
import { deleteCommets } from '../../services/comments'
import notPicture from '../../assets/not-picture2.png'
import './Profile.css'
import Loading from '../../components/loading/Loading'
import { useWindowScroll } from '../../hooks/useWindowScroll'
import { useGetUserLiked } from '../../hooks/useGetUsersLiked'
import ProfileInformation from '../../components/profileInformation/ProfileInformation'
import ProfileComments from '../../components/profileComments/ProfileComments'
import Menu from '../../components/menu/Menu'
import EditPassword from '../../components/editAccount/EditPassword'
import DeleteAcount from '../../components/editAccount/DeleteAccount'
import { defaultOpenModal, openStorie } from '../../reducers/opnModalSlice/openModal'
import useGetNotifications from '../../hooks/useGetNotifications'
import { motion } from 'framer-motion'

const Profile = () => {
  // cargar los datos de la sesion del usuario actual y mandarlos al reducer
  useGetNotifications()
  useWindowScroll()
  useGetUserLiked()

  // se crea la funcion de dispatch y para traer el parametro
  const params = useParams()
  const dispatch = useDispatch()

  // traer los estados del reducer
  const { username, _id, picture, stories } = useSelector(state => state.profileUser)
  const { id } = useSelector(state => state.user)
  const { menu, editPassword, deleteAccount, confirm } = useSelector(state => state.openModal)

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser(params.username)
        dispatch(setProfileUser(res))
        console.log(res)
      } catch (error) {
        console.log('ocurrio un error al traer al usuario')
      }
    })()
    dispatch(defaultOpenModal())
  }, [username, picture])

  // Función para eliminar un comentario específico
  const deletecomment = async (id, token) => {
    try {
      await deleteCommets(id, token)
      const res = await getUser(params.username)
      dispatch(setProfileUser(res))
    } catch (error) {
      console.log('no se elimino el comentario')
    }
  }

  const openHistory = () => {
    dispatch(openStorie({ storie: true }))
  }

  return (
    <>
      {!username && <Loading className='loader-container' />}
      {username &&
        <motion.div layout className={`profile ${confirm ? 'zindex' : ''}`}>
          {!username && <h4>No existe el usuario o ya se eliminó la cuenta</h4>}
          <div className='profile-container'>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0 } }} className='container-picture'>
              <motion.div style={{ userSelect: 'none' }} drag dragConstraints={{ top: -0, left: -0, right: 0, bottom: 0 }} className={`picture ${stories.length > 0 && 'viewPicture'}`}>
                {!picture
                  ? <img className='profile-picture' src={notPicture} />
                  : <img onClick={openHistory} className='profile-picture' src={`${import.meta.env.VITE_URL}/profile-picture/${picture}`} />}
              </motion.div>
            </motion.div>
            <ProfileInformation id={id} />
            {id !== _id && <PostComment _id={_id} />}
            <ProfileComments deletecomment={deletecomment} />
          </div>
        </motion.div>}
      {menu && <Menu />}
      {editPassword && <EditPassword />}
      {deleteAccount && <DeleteAcount />}
    </>
  )
}

export default Profile
