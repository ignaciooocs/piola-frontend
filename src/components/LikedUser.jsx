import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import notPicture from '../assets/not-picture2.png'
import Loading from './loading/Loading'
import PostComment from '../components/postComment/PostComment'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getLikedUsers } from '../services/user'
const LikedUser = () => {
  // traer los estados del reducer
  const { id } = useSelector(state => state.user)

  const get = async () => {
    return await getLikedUsers(id)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['LikedUsers'],
    queryFn: get,
    onSuccess: () => {
      console.log('Liked users obtenidos')
    }
  })
  if (isLoading) return <Loading className='loader-container' />

  if (error) return <div>Error: {error}</div>

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
      {data.map(user => (
        <motion.li
          variants={variants}
          initial='hidden'
          animate='visible'
          className='user-container'
          key={user.username}
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
      ))}
    </motion.ul>
  )
}

export default LikedUser
