import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Stories from 'react-insta-stories'
import { openConfirm, openStorie } from '../../reducers/opnModalSlice/openModal'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../confirmModal/ConfirmModal'
import { confirmClose } from '../../reducers/className/classSlice'
import { deleteStories } from '../../services/stories'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getUser } from '../../services/user'

const Storie = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { confirm } = useSelector(state => state.openModal)
  const { token } = useSelector(state => state.user)

  const get = () => getUser(params.username)

  const { data, isLoading: loading, error } = useQuery({
    queryFn: get,
    queryKey: [params.username]
  })

  if (loading) return <div>loading...</div>
  if (error) return <div>error...</div>

  const { id } = useSelector(state => state.user)

  const initialState = [{
    url: data?.picture,
    duration: 1500,
    header: {
      heading: data?.username,
      profileImage: data?.picture
    }
  }]
  const [storie, setStorie] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [storieId, setStorieId] = useState(null)

  const exitStyle = {
    position: 'absolute',
    bottom: '5px',
    right: '10px',
    color: '#fff',
    fontSize: '30px',
    zIndex: 1200
  }

  const options = (action, id) => {
    action('pause')
    setStorieId(id)
    dispatch(openConfirm({ confirm: true }))
  }

  const getStories = (stories) => {
    setStorie(initialState)
    try {
      stories?.forEach(storiesItem => {
        setStorie(prevStorie => [...prevStorie, {
          content: ({ action }) => (
            <div style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
              {id === data._id && <FontAwesomeIcon icon={faEllipsis} onClick={() => options(action, storiesItem._id)} style={exitStyle}>X</FontAwesomeIcon>}
              <motion.div drag dragConstraints={{ top: -100, left: -100, right: 100, bottom: 500 }} style={{ zIndex: 1200, width: '80%' }}>
                <b style={{ margin: 0, padding: '15px', color: '#ffffff', background: storiesItem.color, display: 'block', textAlign: 'center', borderTopRightRadius: '20px', borderTopLeftRadius: '20px', letterSpacing: '1px' }}>{storiesItem.by}</b>
                <p style={{ margin: 0, padding: '20px', background: '#eeeeef', color: '#444', fontSize: '16px' }}>{storiesItem.comment}</p>
              </motion.div>
              <motion.p drag dragConstraints={{ top: -500, left: -100, right: 100, bottom: 100 }} onClick={() => console.log('response click')} style={{ zIndex: 1200, borderRadius: 4, width: '80%', marginBottom: '20px', margin: 5, fontSize: '16px', maxHeight: '200px', background: '#eeeeef', padding: '20px', overflow: 'auto' }}>{storiesItem.response}</motion.p>
            </div>)
        }])
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(true)
      console.error(error)
    }
  }

  useEffect(() => {
    getStories(data.stories)
  }, [])

  const { mutate } = useMutation(() => deleteStories(storieId, { token }), {
    onSuccess: () => {
      cancelAction()
      storieFinally()
    }
  })

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
    <div style={{ position: 'relative', userSelect: 'mpme', zIndex: 1000 }}>
      {confirm &&
        <ConfirmModal
          text='¡Eliminar esta historia?'
          accept='eliminar'
          colorAccept='#f55'
          acceptAction={mutate}
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
