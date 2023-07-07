import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button/Button'
import { deleteUser, getUserById } from '../../services/user'
import { unsetUser } from '../../reducers/user/userSlice'
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
import { useMutation, useQuery } from '@tanstack/react-query'

const DeleteAcount = () => {
  // se crea función de dispatch para redux y función para la navegación
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // se traen los estdos de los reducers
  const { deleteClass } = useSelector(state => state.className)
  const { token, id, username } = useSelector(state => state.user)
  const { deleteAccount: deleteaccount, confirm } = useSelector(state => state.openModal)

  const [loading, setLoading] = useState(false)

  // obtener datos del usuario iniciado
  const get = () => getUserById(id)

  const { data, isLoading, error } = useQuery({
    queryFn: get,
    queryKey: [username]
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>error...</div>

  // Cerrar la sesion del usuario
  const logout = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      dispatch(unsetUser())
      dispatch(openConfirm({ confirm: false }))
      navigate('/')
    }
  })

  // funcion para eliminar completamente la cuenta del usuario
  const deleteAccount = async () => {
    try {
      dispatch(openConfirm({ confirm: false }))
      setLoading(true)
      // Eliminar likes recibidos
      if (data.likes) {
        for (const likesId of data.likes) {
          try {
            await removeLikeById(likesId._id)
          } catch (error) {
            console.log('ocurrió un error al eliminar el like:', likesId._id)
          }
        }
      }
      // eliminar historias
      if (data.stories) {
        for (const storieId of data.stories) {
          try {
            await deleteStories(storieId._id, { token })
          } catch (error) {
            console.log('ocurrió un error al eliminar la historia:', storieId._id)
          }
        }
      }
      // eliminar Likes dados
      if (data.liked) {
        for (const likesId of data.liked) {
          try {
            await removeLikeById(likesId._id)
          } catch (error) {
            console.log('ocurrió un error al eliminar el liked:', likesId._id)
          }
        }
      }
      // eliminar comentarios
      if (data.comments) {
        for (const comment of data.comments) {
          try {
            await deleteCommets(comment._id, { token })
          } catch (error) {
            console.log('ocurrió un error al eliminar el comentario:', comment._id)
          }
        }
      }
      // eliminar foto de perfil
      if (data.picture) {
        try {
          await deletePicture({ token })
        } catch (error) {
          console.log('ocurrió un error al eliminar la imagen')
        }
      }
    } catch (error) {
      setLoading(false)
      console.log('ocurrió un error al eliminar al usuario')
    } finally {
      setLoading(false)
    }
  }

  // Eliminar todos los datos del usuario
  const deleteDateUser = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      deleteUser({ token })
      logout.mutate()
    }
  })

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
          acceptAction={deleteDateUser.mutate}
          text='¿Eliminar cuenta?'
        />}
    </div>,
    document.getElementById('deleteAccount')
  )
}

export default DeleteAcount
