import { createPortal } from 'react-dom'
import unknown from '../assets/unknown.png'
import Loading from './loading/Loading'

const WelcomeScreen = () => {
  return createPortal(
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      display: 'flex',
      background: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 200
    }}
    >
      <div style={{ width: '100px', height: '100px' }}>
        <img style={{ width: '100%', height: '100%' }} src={unknown} />
        <Loading className='loader-container3' />
      </div>
    </div>,
    document.getElementById('welcome')
  )
}

export default WelcomeScreen
