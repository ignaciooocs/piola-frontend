import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openPreStorie } from '../reducers/opnModalSlice/openModal'
import { getCommentById } from '../services/comments'
import { postStorie } from '../services/stories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const PreStorie = ({ commentId, comment }) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { token, username } = useSelector(state => state.user)

  const [input, setInput] = useState('')
  const [color, setColor] = useState('#2ad')

  const { mutate } = useMutation((content) => postStorie(content, { token }), {
    onSuccess: () => {
      queryClient.invalidateQueries(username)
    }
  })

  const newStorie = async (id) => {
    try {
      if (!input.trim()) {
        return
      }

      const comment = await getCommentById(id)
      if (!comment) {
        return
      }

      const contentStorie = {
        by: comment.by,
        comment: comment.comment,
        response: input,
        color

      }

      mutate(contentStorie)
      setIsOpen(false)
      setTimeout(() => dispatch(openPreStorie({ preStorie: false })), 100)
    } catch (error) {
      console.log('ocurrio un error')
    }
  }

  const storieButton = (id) => {
    newStorie(id)
  }

  const modalStyle = {
    position: 'fixed',
    top: 0,
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    zIndex: 600
  }
  const exitStyle = {
    position: 'absolute',
    top: '5px',
    right: '10px',
    color: '#fff',
    fontSize: '30px'
  }

  const sendStyle = {
    position: 'absolute',
    bottom: '40px',
    right: 'auto',
    color: '#fff',
    fontSize: '35px',
    background: color,
    outline: `${color} solid 5px`,
    padding: 10,
    borderRadius: '50%'
  }
  const [isOpen, setIsOpen] = useState(true)

  const variants = {
    open: { y: 0, scale: 1 },
    closed: { y: 100, scale: 0.1 }
  }

  const exitStorie = () => {
    setIsOpen(false)
    setTimeout(() => {
      dispatch(openPreStorie({ preStorie: false }))
    }, 100)
  }

  return createPortal(
    <motion.div
      initial={{ y: 100, scale: 0.1 }}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      style={modalStyle}
    >
      <FontAwesomeIcon icon={faXmark} onClick={exitStorie} style={exitStyle}>X</FontAwesomeIcon>
      <form style={{ position: 'absolute', top: '8px', right: 60, height: '25px', width: '25px', border: '#fff 1px solid', background: color, borderRadius: 50 }} onClick={() => document.querySelector('.input-color').click()}>
        <input className='input-color' type='color' hidden value={color} onChange={(e) => setColor(e.target.value)} />
      </form>
      <motion.div drag dragConstraints={{ top: -100, left: -100, right: 100, bottom: 500 }} style={{ width: '80%' }}>
        <b style={{ margin: 0, padding: '15px', color: '#ffffff', background: color, display: 'block', textAlign: 'center', borderTopRightRadius: '20px', borderTopLeftRadius: '20px', letterSpacing: '1px' }}>{comment.by}</b>
        <p style={{ margin: 0, padding: '20px', background: '#eeeeef', color: '#444', fontSize: '16px' }}>{comment.comment}</p>
      </motion.div>
      <motion.textarea drag dragConstraints={{ top: -500, left: -100, right: 100, bottom: 100 }} style={{ maxWidth: '80%', width: '80%', marginBottom: '20px', margin: 5, fontSize: '16px', maxHeight: '200px', background: '#eeeeef', padding: '20px' }} type='text' placeholder='responder' onChange={(e) => setInput(e.target.value)} />
      <motion.div drag dragConstraints={{ top: -600, left: -100, right: 100, bottom: 0 }} style={sendStyle}>
        <FontAwesomeIcon icon={faPaperPlane} type='button' onClick={() => storieButton(commentId)}>enviar a la historia</FontAwesomeIcon>
      </motion.div>
      <p style={{ color: '#fff', position: 'absolute', bottom: 5 }}>Enviar a la historia</p>
    </motion.div>,
    document.getElementById('editStorie')
  )
}

export default PreStorie
