import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openPassword } from '../../reducers/opnModalSlice/openModal'
import { editUser } from '../../services/user'
import Button from '../button/Button'
import Input from '../input/Input'
import Loading from '../loading/Loading'

const EditPassword = () => {
  // Funcion para actualizar estados globales
  const dispatch = useDispatch()
  // traer los estados del reducer
  const { _id } = useSelector(state => state.profileUser)
  const { token } = useSelector(state => state.user)
  const { classClose } = useSelector(state => state.className)

  // Estado inicial de los input
  const initialState = {
    prePassword: '',
    password: '',
    confirmPassword: ''
  }

  // estados locales
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(initialState)
  const [close, setClose] = useState('')

  // Función para cambiar contraseña
  const submitPassword = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      if (input.password !== input.confirmPassword) {
        console.log('las contraseña no coinciden')
        return
      }
      if (!input.prePassword.trim() || !input.password.trim() || !input.confirmPassword.trim) {
        console.log('no deje campos vacios')
        return
      }

      const newPassword = {
        prePassword: input.prePassword,
        password: input.password
      }

      const res = await editUser(newPassword, { _id, token })
      console.log(res)
      dispatch(openPassword({ EditPassword: false }))
    } catch (error) {
      setLoading(false)
      console.log('No se actualizó la contraseña')
    } finally {
      setLoading(false)
    }
  }

  // función para manejar los cambios de los input
  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  // funcion para cerrar el modal de editar contraseña
  const cancel = () => {
    setTimeout(() => dispatch(openPassword({ EditPassword: false })), 300)
    setClose('close')
  }

  return createPortal(
    <div className={`container-modal ${close} ${classClose}`}>
      {!loading &&
        <>
          <p>Cambiar contraseña</p>
          <form className='form-edit' onSubmit={submitPassword}>
            <Input type='password' name='prePassword' onChange={onChange} placeholder='Contraseña actual' />
            <Input type='password' name='password' onChange={onChange} placeholder='Nueva contraseña' />
            <Input type='password' name='confirmPassword' onChange={onChange} placeholder='Confirmar nueva contraseña' />
            <div className='container-button-edit'>
              <Button title='Guardar' color='#2ab' />
              <Button type='button' title='Cancelar' color='#f55' onClick={cancel} />
            </div>
          </form>
        </>}
      {loading && <Loading className='loader-container3' />}
    </div>,
    document.getElementById('editPassword')
  )
}

export default EditPassword
