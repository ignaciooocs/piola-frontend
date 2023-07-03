import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/button/Button'
import EditBiography from '../../components/editModals/EditBiography'
import EditUsername from '../../components/editModals/EditUsername'
import Picture from '../../components/editModals/Picture'
import { openBiography, openPicture, openUsername } from '../../reducers/opnModalSlice/openModal'
import notPicture from '../../assets/not-picture2.png'
import './EditProfile.css'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../services/user'
import Loading from '../../components/loading/Loading'

const EditProfile = () => {
  // Se crea funcion de dispatch
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  // traer los estados del reducer
  const { editBiography, editUsername, editPicture } = useSelector(state => state.openModal)
  const { token } = useSelector(state => state.user)

  const get = async () => {
    return await getUser(params.username)
  }
  const { data, isLoading, error } = useQuery({
    queryFn: get,
    queryKey: [params.username]
  })

  // cargar los datos de la sesion del usuario actual
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  if (isLoading) return <Loading />
  if (error) return <p>error: {error}</p>

  return (
    <div className='editProfile'>
      <div className='container-picture'>
        <div className='picture'>
          {!data.picture
            ? <img className='profile-picture' src={notPicture} />
            : <img className='profile-picture' src={data.picture} />}
        </div>
      </div>
      <p style={{ textAlign: 'center' }}>Editar Perfil</p>
      {editPicture && <Picture data={data} />}
      <Button color='#2ad' onClick={() => dispatch(openPicture({ editPicture: true }))} title='cambiar foto' />
      <Button color='#2ad' onClick={() => dispatch(openUsername({ editUsername: true }))} title='editar nombre de usuario' />
      {editUsername && <EditUsername data={data} />}
      <Button color='#2ad' onClick={() => dispatch(openBiography({ editBiography: true }))} title='actualizar biografía' />
      {editBiography && <EditBiography data={data} />}
    </div>
  )
}

export default EditProfile
