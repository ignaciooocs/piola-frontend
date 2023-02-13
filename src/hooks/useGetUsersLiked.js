import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserById } from '../services/user'
import { setLikedUsers } from '../reducers/likedUsersSlice/likedUsersSlice'

export const useGetUserLiked = () => {
  // Se crea funcion de dispatch
  const dispatch = useDispatch()

  // traer los estados del reducer
  const { liked } = useSelector(state => state.profileUserLoggedIn)

  // función que trae todos los perfiles que el usuario actual a indicado que le gustan y se ejecuta en el useEffect
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    getUserLiked()
  }, [liked])

  const getUserLiked = async () => {
    try {
      if (liked) {
        const users = []
        for (const userLiked of liked) {
          const res = await getUserById(userLiked.toUser)
          users.push(res)
        }
        dispatch(setLikedUsers({
          likedUsers: users
        }))
      }
    } catch (error) {
      console.log('error con los usuarios gustados')
    }
  }
}
