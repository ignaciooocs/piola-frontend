import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import EditBiography from '../../components/editModals/EditBiography'
import EditUsername from '../../components/editModals/EditUsername'
import Picture from '../../components/editModals/Picture'
import { openBiography, openPicture, openUsername } from '../../reducers/opnModalSlice/openModal'
// import { setProfileUser } from '../../reducers/profileUser/profileUserSlice'
import notPicture from '../../assets/not-picture2.png'
import './EditProfile.css'
import { getUser } from '../../services/user'
import { setProfileUser } from '../../reducers/profileUser/profileUserSlice'
// const LOCAL_STORAGE = import.meta.env.VITE_USER_PROFILE_LOGGED_IN

const EditProfile = () => {
  // Se crea funcion de dispatch
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // traer los estados del reducer
  const { username, picture } = useSelector(state => state.profileUser)
  const { editBiography, editUsername, editPicture } = useSelector(state => state.openModal)
  const { token } = useSelector(state => state.user)

  // cargar los datos de la sesion del usuario actual
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser(username)
        dispatch(setProfileUser(res))
        console.log(res)
      } catch (error) {
        console.log('ocurrio un error al traer al usuario')
      }
    })()
  }, [username, picture])

  return (
    <div className='editProfile'>
      <div className='container-picture'>
        <div className='picture'>
          {!picture
            ? <img className='profile-picture' src={notPicture} />
            : <img className='profile-picture' src={`http://localhost:5000/profile-picture/${picture}`} />}
        </div>
      </div>
      <p style={{ textAlign: 'center' }}>Editar Perfil</p>
      {editPicture && <Picture />}
      <Button color='#2ad' onClick={() => dispatch(openPicture({ editPicture: true }))} title='cambiar foto' />
      <Button color='#2ad' onClick={() => dispatch(openUsername({ editUsername: true }))} title='editar nombre de usuario' />
      {editUsername && <EditUsername />}
      <Button color='#2ad' onClick={() => dispatch(openBiography({ editBiography: true }))} title='actualizar biografía' />
      {editBiography && <EditBiography />}
    </div>
  )
}

export default EditProfile
