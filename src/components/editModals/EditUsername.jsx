import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setComments, setProfileUser } from '../../reducers/profileUser/profileUserSlice'
import { setUser } from '../../reducers/user/userSlice'
import { editUser } from '../../services/user'
import Input from '../../components/input/Input'
import Button from '../button/Button'
import './EditModals.css'
import { openUsername } from '../../reducers/opnModalSlice/openModal'
import Loading from '../loading/Loading'
import { useNavigate } from 'react-router-dom'
// const STORAGE = import.meta.env.VITE_USER_STORAGE

const EditUsername = ({ data }) => {
  // se crea la función de dispatch para actualizar estados globales
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // se traen los estados globales
  const { token } = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [input, setInput] = useState(data.username)
  const [close, setClose] = useState('')

  // función para cambiar nombre de usuario
  const submitUsername = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      if (!input.match(/^\S*$/)) {
        setError('No se permiten espacios')
        return
      }

      const newUsername = {
        username: input
      }

      const res = await editUser(newUsername, { _id: data._id, token })
      dispatch(setProfileUser(res))
      dispatch(setUser({
        username: res.username,
        token,
        id: res._id
      }))
      dispatch(setComments({ comments: data.comments }))
      console.log(res)
      navigate(`/${res.username}`)
    } catch (error) {
      setLoading(false)
      console.log('No se actualizó el nombre de usuario')
    } finally {
      setLoading(false)
    }
  }

  // función para cerrar modal de editar nombre de usuario
  const cancel = () => {
    setTimeout(() => dispatch(openUsername({ editUsername: false })), 300)
    setClose('close')
  }

  return createPortal(
    <div className={`container-modal ${close}`}>
      {!loading &&
        <>
          <p>Nombre de usuario</p>
          <form className='form-edit' onSubmit={submitUsername}>
            <p className='error'>{error}</p>
            <Input type='text' name='username' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Nuevo nombre de usuario' />
            <div className='container-button-edit'>
              <Button title='Guardar' color='#2ab' />
              <Button type='button' onClick={cancel} title='Cancelar' color='#f55' />
            </div>
          </form>
        </>}
      {loading && <Loading className='loader-container3' />}
    </div>,
    document.getElementById('editUsername')
  )
}

export default EditUsername
