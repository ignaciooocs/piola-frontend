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
import ProfileInformation from '../../components/profileInformation/ProfileInformation'
import ProfileComments from '../../components/profileComments/ProfileComments'
import Menu from '../../components/menu/Menu'
import EditPassword from '../../components/editAccount/EditPassword'
import DeleteAcount from '../../components/editAccount/DeleteAccount'
import { openStorie } from '../../reducers/opnModalSlice/openModal'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  useWindowScroll()

  // se crea la funcion de dispatch y para traer el parametro
  const params = useParams()
  const dispatch = useDispatch()

  // traer los estados del reducer
  const { id } = useSelector(state => state.user)
  const { menu, editPassword, deleteAccount, confirm } = useSelector(state => state.openModal)

  // obtener datos del perfil del usuario
  const get = async () => {
    return await getUser(params.username)
  }

  const { data, isLoading, error } = useQuery({
    queryFn: get,
    queryKey: [params.username],
    onSuccess: () => {
      console.log('logged in user obtenido')
    }
  })

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

  if (isLoading) return <Loading className='loader-container' />
  if (error) return <p>error: {error}</p>

  return (
    <>
      <motion.div layout className={`profile ${confirm ? 'zindex' : ''}`}>
        {!data.username && <h4>No existe el usuario o ya se eliminó la cuenta</h4>}
        <div className='profile-container'>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0 } }} className='container-picture'>
            <motion.div style={{ userSelect: 'none' }} drag dragConstraints={{ top: -0, left: -0, right: 0, bottom: 0 }} className={`picture ${data.stories?.length > 0 && 'viewPicture'}`}>
              {!data.picture
                ? <img className='profile-picture' src={notPicture} />
                : <img onClick={openHistory} className='profile-picture' src={data.picture} />}
            </motion.div>
          </motion.div>
          <ProfileInformation data={data} id={id} />
          {id !== data._id && <PostComment _id={data._id} />}
          <ProfileComments data={data} deletecomment={deletecomment} />
        </div>
      </motion.div>
      {menu && <Menu />}
      {editPassword && <EditPassword />}
      {deleteAccount && <DeleteAcount />}
    </>
  )
}

export default Profile
