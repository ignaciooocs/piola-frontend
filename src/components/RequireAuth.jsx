import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const { token } = useSelector(state => state.user)

  if (!token) {
    return <Navigate to='/login' />
  }
  return children
}

export default RequireAuth
