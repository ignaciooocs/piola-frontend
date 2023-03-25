import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserById } from '../services/user'
import { NavLink } from 'react-router-dom'
import { setProfileUserLoggedIn } from '../reducers/profileUserLoggedIn/profileUserLoggedIn'
import { useGetUserLiked } from '../hooks/useGetUsersLiked'
import notPicture from '../assets/not-picture2.png'
import Loading from './loading/Loading'
import PostComment from '../components/postComment/PostComment'
import useGetNotifications from '../hooks/useGetNotifications'
import { motion } from 'framer-motion'

const LikedUser = () => {
  useGetNotifications()
  // Se crea funcion de dispatch
  const dispatch = useDispatch()

  // traer los estados del reducer
  const { id } = useSelector(state => state.user)
  const { likedUsers } = useSelector(state => state.likedUsers)
  // const { liked } = useSelector(state => state.profileUserLoggedIn)

  // Trae las propiedades del usuario iniciado
  useEffect(() => {
    apiUser()
  }, [])

  // se ejecuta el hook que trae los perfiles que el usuario actual a indicado que le gustan
  useGetUserLiked()

  // Funcion que busca el perfil que a iniciado y se ejecuta en el useEffect
  const apiUser = async () => {
    try {
      const res = await getUserById(id)
      dispatch(setProfileUserLoggedIn(res))
    } catch (error) {
      console.log('no se pudo traer el usuario')
    }
  }

  const variants = {
    hidden: {
      opacity: 0
    },
    visible: () => ({
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        type: 'spring'
      }
    })
  }

  return (
    <motion.ul layout className='users-container'>
      {likedUsers
        ? likedUsers.map(user => (
          <motion.li
            variants={variants}
            initial='hidden'
            animate='visible'
            className='user-container'
            key={user._id}
          >
            <div className='container-username'>
              <NavLink className='username' to={user.username}>
                <div className='container-pictures'>
                  {!user.picture
                    ? <img className='user-picture' src={notPicture} />
                    : <img className='user-picture' src={user.picture} />}
                </div>
                <b>@{user.username}</b>
              </NavLink>
            </div>
            {user.comments?.length === 0 && <PostComment _id={user._id} />}
            <ul className='user-comments-container'>
              {
                user.comments.map(comment => (
                  <li className='comment-container' key={comment._id}>
                    <h4>By: {comment.by}</h4>
                    <p>{comment.comment.split(' ').slice(0, 25).join(' ')}{comment.comment.split(' ').length > 25 ? '...' : ''}</p>
                  </li>
                )).slice(-3).reverse()
                }
            </ul>
          </motion.li>
        ))
        : <Loading className='loader-container' />}
    </motion.ul>
  )
}

export default LikedUser
