import { createContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { openConfirm } from '../reducers/opnModalSlice/openModal'

export const StorieContext = createContext()

const StorieProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { username, picture, _id } = useSelector(state => state.profileUser)
  const { id } = useSelector(state => state.user)
  const initialState = [{
    url: `${import.meta.env.VITE_URL}/profile-picture/${picture}`,
    duration: 1500,
    header: {
      heading: username,
      profileImage: `${import.meta.env.VITE_URL}/profile-picture/${picture}`
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
              {id === _id && <FontAwesomeIcon icon={faEllipsis} onClick={() => options(action, storiesItem._id)} style={exitStyle}>X</FontAwesomeIcon>}
              <motion.div drag dragConstraints={{ top: -100, left: -100, right: 100, bottom: 500 }} style={{ zIndex: 1200, width: '80%' }}>
                <b style={{ margin: 0, padding: '15px', color: '#ffffff', background: storiesItem.color, display: 'block', textAlign: 'center', borderTopRightRadius: '20px', borderTopLeftRadius: '20px', letterSpacing: '1px' }}>{storiesItem.by}</b>
                <p style={{ margin: 0, padding: '20px', background: '#eeeeef', color: '#444', fontSize: '16px' }}>{storiesItem.comment}</p>
              </motion.div>
              <motion.p drag dragConstraints={{ top: -500, left: -100, right: 100, bottom: 100 }} onClick={() => console.log('response click')} style={{ zIndex: 1200, borderRadius: 4, width: '80%', marginBottom: '20px', margin: 5, fontSize: '16px', maxHeight: '200px', background: '#eeeeef', padding: '20px', overflow: 'auto' }}>{storiesItem.response}</motion.p>
            </div>)
        }])
      })
      console.log(storie)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(true)
      console.error(error)
    }
  }

  return (
    <StorieContext.Provider value={{ getStories, storie, setStorie, isLoading, setIsLoading, storieId }}>
      {children}
    </StorieContext.Provider>
  )
}

export default StorieProvider
