import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openBiography } from '../../reducers/opnModalSlice/openModal'
import { editUser } from '../../services/user'
import Button from '../button/Button'
import Loading from '../loading/Loading'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const EditBiography = ({ data }) => {
  // se crea la función del dispatch para actualizar los estados globales
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // traer los estados globales
  const { token } = useSelector(state => state.user)

  // estados locales
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(data.biography || '')
  const [close, setClose] = useState('')

  const { mutate } = useMutation((newBiography) => editUser(newBiography, { token }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(data.username)
      navigate(`/${data.username}`)
    }
  })

  // Función para actualizar biografía
  const submitBiography = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const newBiography = {
        biography: input
      }

      mutate(newBiography)
    } catch (error) {
      console.log('No se actualizo la biografía')
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
