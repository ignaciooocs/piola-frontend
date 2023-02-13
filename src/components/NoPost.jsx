import noPost from '../assets/noPost.png'
import { motion } from 'framer-motion'

const NoPost = ({ id, _id }) => {
  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  return (
    <div style={modalStyle} className='container-nopost'>
      {id === _id &&
        <>
          <motion.div className='nopost-img-container'>
            <img className='nopost-img' src={noPost} />
          </motion.div>
          <p>Aun no tienes publicaciónes</p>
        </>}
      {id !== _id &&
        <>
          <motion.div drag dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }} className='nopost-img-container'>
            <img className='nopost-img' src={noPost} />
          </motion.div>
          <p>¡Se el primero en publicar!</p>
        </>}
    </div>
  )
}

export default NoPost
