import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { like, removeLike } from '../services/like'
import { getUser, getUserById } from '../services/user'
import { setProfileUser } from '../reducers/profileUser/profileUserSlice'
import Loading from './loading/Loading'
import { useState } from 'react'
import { setProfileUserLoggedIn } from '../reducers/profileUserLoggedIn/profileUserLoggedIn'

const ButtonLike = ({ data }) => {
  // se crea la funcion de dispatch y para traer el parametro
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  // traer los estados del reducer
  const { token, id } = useSelector(state => state.user)

  // Busca si el usuario iniciado a dado like al perfil (devuelve true o false)
  const fromLike = data.likes.some(user => user.fromUser === id)
  console.log(fromLike)

  // se crea el objeto con el id del usuario que da like y el que lo recibe
  const Like = {
    fromUser: id,
    toUser: data._id
  }

  // Función para dar like
  const postLike = async () => {
    try {
      if (!token) {
        navigate('/')
        // window.alert('debes iniciar sesión')
        console.log('Debes iniciar sesión')
        return
      }
      setLoading(true)
      await like(Like, { _id: data._id, token })
      console.log('se dio el like')
      const res = await getUser(params.username)
      const user = await getUserById(id)
      dispatch(setProfileUser(res))
      dispatch(setProfileUserLoggedIn(user))
    } catch (error) {
      setLoading(false)
      console.log('ocurrio un error al dar like')
    } finally {
      setLoading(false)
    }
  }

  // Función para quitar like
  const deleteLike = async () => {
    try {
      setLoading(true)
      await removeLike({ _id: data._id, token })
      console.log('se elimino el like')
      const res = await getUser(params.username)
      const user = await getUserById(id)
      dispatch(setProfileUser(res))
      dispatch(setProfileUserLoggedIn(user))
    } catch (error) {
      setLoading(false)
      console.log('ocurrio un error al remover el like')
    } finally {
      setLoading(false)
    }
  }

  // Funcion que da o quita el like según si el usuario iniciado ya a dado like
  const postLikeAndRemove = () => {
    fromLike ? deleteLike() : postLike()
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
