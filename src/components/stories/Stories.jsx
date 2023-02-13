import React, { useEffect, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Stories from 'react-insta-stories'
import { openConfirm, openStorie } from '../../reducers/opnModalSlice/openModal'
import { StorieContext } from '../../context/storieProvider'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../confirmModal/ConfirmModal'
import { confirmClose } from '../../reducers/className/classSlice'
import { deleteStories } from '../../services/stories'

const Storie = () => {
  const dispatch = useDispatch()
  const { stories } = useSelector(state => state.profileUser)
  const { confirm } = useSelector(state => state.openModal)
  const { token } = useSelector(state => state.user)

  const { getStories, storie, isLoading, storieId } = useContext(StorieContext)

  useEffect(() => {
    getStories(stories)
  }, [])

  const deleteStorie = async () => {
    try {
      await deleteStories(storieId, { token })
      cancelAction()
      storieFinally()
    } catch (error) {
      console.log('no se elimino la historia')
    }
  }

  const storieFinally = () => {
    setIsOpen(false)
    setTimeout(() => {
      dispatch(openStorie({ storie: false }))
    }, 100)
  }

  const [isOpen, setIsOpen] = useState(true)

  const variants = {
    open: { y: 0, scale: 1 },
    closed: { y: 100, scale: 0.1 }
  }

  const cancelAction = () => {
    if (confirm) {
      dispatch(confirmClose({ confirmClass: 'confirmClass' }))
      setTimeout(() => {
        dispatch(openConfirm({ confirm: false }))
        dispatch(confirmClose({ confirmClass: '' }))
      }, 200)
    }
  }

  return (
    <div style={{ position: 'relative', userSelect: 'mpme' }}>
      {confirm &&
        <ConfirmModal
          text='¡Eliminar esta historia?'
          accept='eliminar'
          colorAccept='#f55'
          acceptAction={deleteStorie}
          colorCancel='#2ad'
          cancel='cancelar'
          cancelAction={cancelAction}
        />}
      <motion.div
        onClick={storieFinally}
        style={{ color: '#fff', zIndex: 1100, position: 'fixed', top: 20, right: 20, fontSize: '24px' }}
        initial={{ y: 100, scale: 0.1 }}
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
      >
        <FontAwesomeIcon icon={faXmark} />
      </motion.div>
      {!isLoading &&
        <motion.div
          initial={{ y: 100, scale: 0.1 }}
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
        >
          <Stories
            stories={storie}
            keyboardNavigation
            defaultInterval={5000}
            width='100vw'
            height='100vh'
            onAllStoriesEnd={storieFinally}
          />
        </motion.div>}

    </div>
  )
}

export default Storie
