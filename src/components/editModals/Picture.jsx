import { useState } from 'react'
import { createPortal } from 'react-dom'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button/Button'
import notPicture from '../../assets/not-picture2.png'
import { openPicture } from '../../reducers/opnModalSlice/openModal'
import Loading from '../loading/Loading'
import { uploadFile } from '../../firebase/config'
import { deletePicture } from '../../services/picture'
const BASE_URL = import.meta.env.VITE_BASE_URL

const Picture = ({ data }) => {
  // se crea función de dispatch para redux y función para la navegación
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // estados globales de los reducers
  const { token, username, id } = useSelector(state => state.user)

  // token para las peticiónes a la api
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // Estados locales para manejar imagen, loading, y clase del modal
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [close, setClose] = useState('')

  // const [file, setfile] = useState(null)

  // Función para manejar foto y para mostrae vista previa
  const handleImageChange = (e) => {
    setImage(e.target.files[0])
    // Configuración para mostrar la vista previa de la imagen
    const reader = new window.FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setPreview(reader.result)
    }
  }

  //  función para cambiar foto de perfil
  const handleSubmitFile = async (e) => {
    e.preventDefault()
    if (!image) {
      console.log('no se cambio')
      return
    }
    try {
      setLoading(true)
      const res = await uploadFile(image, id)
      const files = {
        url: res
      }
      const url = `${BASE_URL}/profile/image`
      const response = await Axios.post(url, files, config)
      console.log(response)
      navigate(`/${username}`)
    } catch (error) {
      setLoading(false)
      console.log('error al subir la foto')
    } finally {
      setLoading(false)
    }
  }

  // función para confirar eliminación de foto de perfil
  const deletePictures = async () => {
    try {
      setLoading(true)
      await deletePicture({ token })
      navigate(`/${username}`)
    } catch (error) {
      setLoading(false)
      console.log('no se elimino la imagen')
    } finally {
      setLoading(false)
    }
  }

  // Función para cerra modal de cambiar foto
  const cancel = () => {
    setTimeout(() => dispatch(openPicture({ editPicure: false })), 300)
    setClose('close')
  }

  return createPortal(
    <div className={`container-modal ${close}`}>
      {!loading &&
        <>
          <div className='container-picture'>
            <div className='picture'>
              {!data.picture
                ? <img className='profile-picture' src={preview || notPicture} />
                : <img className='profile-picture' src={preview || data.picture} />}
            </div>
          </div>
          <p style={{ textAlign: 'center' }}>{username}</p>
          <div>
            <form className='form-picture' onClick={() => document.querySelector('.input-picture').click()}>
              <input className='input-picture' type='file' accept='image/*' name='picture' hidden onChange={handleImageChange} />
              <Button type='button' color='#27cc67' title='Elegir foto' />
            </form>
            <div className='container-buttons-picture'>
              <Button onClick={() => deletePictures()} color='#f55' title='Eliminar foto actual' />
              <Button title='Guardar' color='#2ab' onClick={handleSubmitFile} />
              <Button onClick={cancel} color='#f55' title='Salir' />
            </div>
          </div>
        </>}
      {loading && <Loading className='loader-container3' />}
    </div>,
    document.getElementById('editPicture')
  )
}

export default Picture
