import { NavLink } from 'react-router-dom'
import notPicture from '../assets/not-picture2.png'
import PostComment from '../components/postComment/PostComment'
import { motion } from 'framer-motion'

const LikedUser = ({ data }) => {
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
          {user.comments?.length === 0 && <PostComment data={user} />}
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
