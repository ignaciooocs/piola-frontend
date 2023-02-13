import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button/Button'
import { deleteUser } from '../../services/user'
import { unsetUser } from '../../reducers/user/userSlice'
import { setLikedUsers } from '../../reducers/likedUsersSlice/likedUsersSlice'
import { unsetProfileUserLoggedIn } from '../../reducers/profileUserLoggedIn/profileUserLoggedIn'
import { unsetProfileUser } from '../../reducers/profileUser/profileUserSlice'
import { removeLikeById } from '../../services/like'
import { deletePicture } from '../../services/picture'
import { deleteCommets } from '../../services/comments'
import Loading from '../loading/Loading'
import { openConfirm, openDeleteAccount } from '../../reducers/opnModalSlice/openModal'
import ConfirmModal from '../confirmModal/ConfirmModal'
import { deleteClose, confirmClose } from '../../reducers/className/classSlice'
import './EditAccount.css'
import { Logout } from '../../services/logout'
import { deleteStories } from '../../services/stories'

const DeleteAcount = () => {
  // se crea función de dispatch para redux y función para la navegación
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // se traen los estdos de los reducers
  const { deleteClass } = useSelector(state => state.className)
  const { token } = useSelector(state => state.user)
  const { likes, liked, picture, comments, stories } = useSelector(state => state.profileUser)
  const { deleteAccount: deleteaccount, confirm } = useSelector(state => state.openModal)

  const [loading, setLoading] = useState(false)

  const exit = async () => {
    try {
      await Logout()
    } catch (error) {
      console.log('error')
    }
  }

  // función para cerrar sesión después de eliminar la cuenta
  const logout = () => {
    exit()
    dispatch(unsetUser())
    dispatch(setLikedUsers({
      likedUsers: null
    }))
    dispatch(unsetProfileUserLoggedIn())
    dispatch(unsetProfileUser())
    navigate('/')
  }

  // funcion para eliminar completamente la cuenta del usuario
  const deleteAccount = async () => {
    try {
      dispatch(openConfirm({ confirm: false }))
      setLoading(true)
      if (liked) {
        for (const likesId of likes) {
          await removeLikeById(likesId._id)
        }
      }
      if (stories) {
        for (const storieId of stories) {
          await deleteStories(storieId._id, { token })
        }
      }
      if (liked) {
        for (const likesId of liked) {
          await removeLikeById(likesId._id)
        }
      }
      console.log('likes eliminados')
      if (comments) {
        for (const comment of comments) {
          await deleteCommets(comment._id, { token })
        }
        console.log('stories eliminadas')
      }
      console.log('Comentarios eliminados')
      if (picture) {
        await deletePicture(picture, { token })
      }
      console.log('imagen eliminada')
      await deleteUser({ token })
      console.log('usuario eilminado')
      logout()
    } catch (error) {
      setLoading(false)
      console.log('ocurrio un error al eliminar al usuario')
    } finally {
      setLoading(false)
    }
  }

  // función para abrir el modal de confirmación de eliminación de cuenta
  const open = () => {
    dispatch(confirmClose({ confirmClass: '' }))
    dispatch(openConfirm({ confirm: true }))
  }

  // función para cerrar modal de eliminar cuenta
  const cancelAction = () => {
    dispatch(confirmClose({ confirmClass: 'confirmClass' }))
    setTimeout(() => dispatch(openConfirm({ confirm: false })), 200)
  }

  // Funcion para cerrar modal de eliminar cuenta
  const closeDeleteModal = () => {
    setTimeout(() => {
      dispatch(openDeleteAccount({ deleteAccount: false }))
      dispatch(deleteClose({ deleteClass: '' }))
    }, 200)
    dispatch(deleteClose({ deleteClass: 'closeDelete' }))
  }

  return createPortal(
    <div className={`container-modal-deleteAccount ${deleteClass}`}>
      {!loading &&
        <div>
          <p className='text-deleteAccount'>¡ATENCION!<br /> Estás apunto de eliminar tu cuenta, al hacerlo todas tus publicaciones y lovers se eliminarán y ya no aparecerás en la lista de tus amigos</p>
          <div className='container-button-deleteAccount'>
            <Button onClick={open} title='Eliminar cuenta' color='#f55' />
            <Button onClick={closeDeleteModal} title='cancelar' color='#2ad' />
          </div>
        </div>}
      {loading && <Loading className='loader-container3' />}
      {(confirm && deleteaccount) &&
        <ConfirmModal
          cancelAction={cancelAction}
          cancel='cancelar'
          colorCancel='#2ad'
          accept='eliminar'
          colorAccept='#f55'
          acceptAction={deleteAccount}
          text='¿Eliminar cuenta?'
        />}
    </div>,
    document.getElementById('deleteAccount')
  )
}

export default DeleteAcount
