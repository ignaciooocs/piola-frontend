import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openBiography } from '../../reducers/opnModalSlice/openModal'
import { setProfileUser, setComments } from '../../reducers/profileUser/profileUserSlice'
import { editUser } from '../../services/user'
import Button from '../button/Button'
import Loading from '../loading/Loading'

const EditBiography = () => {
  // se crea la función del dispatch para actualizar los estados globales
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // traer los estados globales
  const { biography, _id, comments } = useSelector(state => state.profileUser)
  const { token } = useSelector(state => state.user)

  // estados locales
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(biography)
  const [close, setClose] = useState('')

  // Función para actualizar biografía
  const submitBiography = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const newBiography = {
        biography: input
      }

      const res = await editUser(newBiography, { _id, token })
      dispatch(setProfileUser(res))
      dispatch(setComments({ comments }))
      console.log(res)
      navigate(`/${res.username}`)
    } catch (error) {
      setLoading(false)
      console.log('No se actualizo la biografía')
    } finally {
      setLoading(false)
    }
  }

  // función para cerrar modal de editar biografía
  const cancel = () => {
    setTimeout(() => dispatch(openBiography({ editBiography: false })), 300)
    setClose('close')
  }

  return createPortal(
    <div className={`container-modal ${close}`}>
      {!loading &&
        <>
          <p>Biografia</p>
          <form className='form-edit' onSubmit={submitBiography}>
            <textarea className='textarea' type='text' name='biography' placeholder='Escribe tu biografía' value={input} onChange={(e) => setInput(e.target.value)} />
            <div className='container-button-edit'>
              <Button title='Guardar' color='#2ab' />
              <Button type='button' onClick={cancel} title='Cancelar' color='#f55' />
            </div>
          </form>
        </>}
      {loading && <Loading className='loader-container3' />}
    </div>,
    document.getElementById('editBiography')
  )
}

export default EditBiography
