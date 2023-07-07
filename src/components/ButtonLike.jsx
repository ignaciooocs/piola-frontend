import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { like, removeLike } from '../services/like'
import Loading from './loading/Loading'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const ButtonLike = ({ data }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Estado para el controlar el loading
  const [loading, setLoading] = useState(false)

  // traer los estados del reducer
  const { token, id, username } = useSelector(state => state.user)

  // Busca si el usuario iniciado a dado like al perfil (devuelve true o false)
  const fromLike = data.likes.some(user => user.fromUser === id)

  // se crea el objeto con el id del usuario que da like y el que lo recibe
  const Like = { fromUser: id, toUser: data._id }

  const POSTLIKE = async () => {
    try {
      if (!token) {
        navigate('/')
        return
      }
      setLoading(true)
      await like(Like, { _id: data._id, token })
    } catch (error) {
      setLoading(false)
      console.log('ocurrio un error al dar like')
    } finally {
      setLoading(false)
    }
  }

  const postLikeMutation = useMutation({
    mutationFn: POSTLIKE,
    onSuccess: () => {
      queryClient.invalidateQueries(username)
      queryClient.invalidateQueries(data.username)
    }
  })

  // Funcion para eliminar un like de un perfil
  const REMOVELIKE = async () => {
    try {
      setLoading(true)
      await removeLike({ _id: data._id, token })
    } catch (error) {
      setLoading(false)
      console.log('ocurrio un error al remover el like')
    } finally {
      setLoading(false)
    }
  }

  const removeLikeMutation = useMutation({
    mutationFn: REMOVELIKE,
    onSuccess: () => {
      console.log('Like removido')
      queryClient.invalidateQueries(username)
      queryClient.invalidateQueries(data.username)
    }
  })

  // Funcion que da o quita el like según si el usuario iniciado ya a dado like
  const postLikeAndRemove = () => {
    fromLike ? removeLikeMutation.mutate() : postLikeMutation.mutate()
  }

  // Si el usuario iniciado da like el boton cambiará a rojo
  const color = fromLike ? '#2ad' : '#fff'
  const colorTxt = fromLike ? '#000' : '#fff'
  const bg = !fromLike ? '#2ad' : '#eeeeef'
  const text = fromLike ? 'Loving' : 'To love'

  const style = {
    background: `${bg}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '30px',
    width: '100px',
    borderRadius: '5px'
  }

  return (
    <div className='toLove-container'>
      {!loading &&
        <div onClick={postLikeAndRemove} style={style}>
          <span style={{ color: `${colorTxt}` }}>{text}</span>
          <FontAwesomeIcon icon={faHeart} style={{ color: `${color}` }} />
        </div>}
      {loading && <Loading className='loader-container3' />}
    </div>
  )
}

export default ButtonLike
