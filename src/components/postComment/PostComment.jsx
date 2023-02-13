import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postComment } from '../../services/comments'
import { getUser } from '../../services/user'
import { useParams } from 'react-router-dom'
import { setProfileUser } from '../../reducers/profileUser/profileUserSlice'
import Input from '../input/Input'
import Button from '../button/Button'
import Loading from '../loading/Loading'
import './PostComment.css'
import { motion } from 'framer-motion'

const PostComment = ({ _id }) => {
  // se crea la funcion de dispatch y para traer el parametro
  const dispatch = useDispatch()
  const params = useParams()

  // Traer los estados del reducer
  const { token } = useSelector(state => state.user)

  // Estado inicial del comentario
  const initialState = {
    by: 'anonymous',
    comment: ''
  }

  const [loading, setLoading] = useState(false)
  // Estado y funcion para manejar el valor y los cambios del input
  const [input, setInput] = useState(initialState)

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  // Funcion para publicar un nuevo comentario
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      window.alert('Debes iniciar sesion')
      return
    }

    const comment = {
      by: input.by,
      comment: input.comment
    }
    try {
      setLoading(true)
      await postComment(comment, { _id, token })
      const res = await getUser(params.username)
      dispatch(setProfileUser(res))

      setInput(initialState)
    } catch (error) {
      setLoading(false)
      console.log('no se a publicado el comentario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5
        }
      }} className='form-postComment' onSubmit={handleSubmit}
    >
      {!loading &&
        <>
          <label>Nuevo Post</label>
          <div className='container-input'>
            <Input type='text' placeholder='Escribe tu nombre' name='by' value={input.by} onChange={handleChange} />
            <textarea type='text' placeholder='escribe la nueva pregunta o confesión' value={input.comment} name='comment' onChange={handleChange} />
          </div>
          <Button title='Publicar' color='#2ad' />
        </>}
      {loading && <Loading className='loader-container3' />}
    </motion.form>
  )
}

export default PostComment
