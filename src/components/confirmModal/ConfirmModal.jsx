import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import Button from '../button/Button'
import './ConfirmModal.css'

const ConfirmModal = (props) => {
  // se hace destructuring de las props
  const {
    text,
    accept,
    acceptAction,
    colorAccept,
    cancel,
    cancelAction,
    colorCancel
  } = props

  // se trae el estado que actualiza la clase para la aninmación
  const { confirmClass } = useSelector(state => state.className)

  return createPortal(
    <div className='container-confirm' style={{ zIndex: 1200 }}>
      <div className={`confirm ${confirmClass}`}>
        <p>{text}</p>
        <div className='container-button-confirm'>
          <Button title={accept} onClick={acceptAction} color={colorAccept} />
          <Button title={cancel} onClick={cancelAction} color={colorCancel} />
        </div>
      </div>
    </div>,
    document.getElementById('confirm')
  )
}

export default ConfirmModal
