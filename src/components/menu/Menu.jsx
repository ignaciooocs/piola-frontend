import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { confirmClose } from '../../reducers/className/classSlice'
import { openConfirm, openDeleteAccount, openPassword } from '../../reducers/opnModalSlice/openModal'
import Button from '../button/Button'
import './Menu.css'

const Menu = () => {
  // Función para actualizar estado global y para la navegación
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // estado global para actualizar la clase
  const { classClose } = useSelector(state => state.className)
  const { username } = useSelector(state => state.user)

  // función que abre el modal de confirmacion para cerrar sesión
  const open = () => {
    dispatch(confirmClose({ confirmClass: '' }))
    dispatch(openConfirm({ confirm: true }))
  }

  return createPortal(
    <div className={`container-menu ${classClose}`}>
      <h4>Menú</h4>
      <div className='container-buttons'>
        <div className='buttons-menu'>
          <Button title='editar perfil' color='#2ad' onClick={() => navigate('/edit/profile/' + username)} />
          <Button title='Cambiar contraseña' onClick={() => dispatch(openPassword({ editPassword: true }))} color='#2ad' />
          <Button title='Eliminar cuenta' onClick={() => dispatch(openDeleteAccount({ deleteAccount: true }))} color='#f55' />
        </div>
        <div className='container-logout-button'>
          <Button title='Cerrar sesión' onClick={open} color='#f55' />
        </div>
      </div>
    </div>,
    document.getElementById('menu')
  )
}

export default Menu
