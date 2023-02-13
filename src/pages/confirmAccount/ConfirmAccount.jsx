import { NavLink, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
const BASE_URL = import.meta.env.VITE_BASE_URL

const ConfirmAccount = () => {
  const params = useParams()
  const [confirmed, setConfirmed] = useState(null)

  useEffect(() => {
    confirmAccount()
  }, [])

  const confirmAccount = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/confirm/account/${params.token}`)
      const { data } = res
      setConfirmed(data.confirmed)
      console.log(data)
    } catch (error) {
      console.log('no se confirmo la cuenta')
    }
  }
  return (
    <>
      {confirmed &&
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#2ad', padding: '50px', fontSize: '100px' }} />
          <h1 style={{ color: '#555', fontSize: '30px' }}>¡Tu cuenta ha sido confirmada!</h1>
          <p style={{ color: '#888', fontSize: '20px', padding: '20px' }}>
            ¡Bien hecho! Ahora puedes disfrutar de todas las funcionalidades de nuestra aplicación.
          </p>
          <NavLink to='/'>volver al inicio</NavLink>
        </div>}
      {!confirmed &&
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
          <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#f55', padding: '50px', fontSize: '100px' }} />
          <h1 style={{ color: '#555', fontSize: '30px', padding: '0 20px' }}>Lo sentimos, tu cuenta no ha sido confirmada</h1>
          <p style={{ color: '#888', fontSize: '20px', padding: '20px', textAlign: 'center', paddingLeft: '50px', paddingRight: '50px' }}>
            Por favor, revisa tu correo electrónico y haz clic en el enlace de confirmación. Si aún no has recibido un correo,
            por favor, verifica tu carpeta de correo no deseado o ponte en contacto con nosotros para obtener ayuda.
          </p>
          <NavLink to='/'>volver al inicio</NavLink>
        </div>}
    </>
  )
}

export default ConfirmAccount
