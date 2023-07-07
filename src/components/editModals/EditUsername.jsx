import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editUser } from '../../services/user'
import Input from '../../components/input/Input'
import Button from '../button/Button'
import './EditModals.css'
import { openUsername } from '../../reducers/opnModalSlice/openModal'
import Loading from '../loading/Loading'
import { useMutation } from '@tanstack/react-query'
import { setUser } from '../../reducers/user/userSlice'
import { useNavigate } from 'react-router-dom'

const EditUsername = ({ data }) => {
  // se crea la función de dispatch para actualizar estados globales
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // se traen los estados globales
  const { token, id, username } = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [input, setInput] = useState(data.username)
  const [close, setClose] = useState('')

  const { mutate } = useMutation((newUsername) => editUser(newUsername, { token }), {
    onSuccess: (data) => {
      navigate(`/${data.username}`)
      dispatch(setUser({ token, username: data.username, id }))
      setLoading(false)
    }
  })

  // función para cambiar nombre de usuario
  const submitUsername = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      if (input === '') {
        setError('Debes escribir un nombre')
        return
      }
      if (!input.match(/^\S*$/)) {
        setError('No se permiten espacios')
        return
      }

      if (input === username) {
        setError('Ya tienes ese nombre')
        return
      }

      const newUsername = {
        username: input
      }

      mutate(newUsername)
    } catch (error) {
      console.log('No se actualizó el nombre de usuario')
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
            {error !== '' && <p className='error'>{error}</p>}
            <Input
              type='text' name='username' value={input} onChange={(e) => {
                setError('')
                setInput(e.target.value)
              }} placeholder='Nuevo nombre de usuario'
            />
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
