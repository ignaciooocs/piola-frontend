import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../services/user'
import { setProfileUser } from '../reducers/profileUser/profileUserSlice'
import { defaultOpenModal } from '../reducers/opnModalSlice/openModal'

const useProfileUser = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const { username, picture } = useSelector(state => state.profileUser)

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser(params.username)
        dispatch(setProfileUser(res))
        console.log(res)
      } catch (error) {
        console.log('ocurrio un error al traer al usuario')
      }
    })()
    dispatch(defaultOpenModal())
  }, [username, picture])
}

export default useProfileUser
