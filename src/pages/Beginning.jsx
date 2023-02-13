import { useSelector } from 'react-redux'
import Login from './login/Login'
import Home from './home/Home'

const Beginning = () => {
  const { token } = useSelector(state => state.user)

  return (
    <>
      {
        token
          ? <Home />
          : <Login />
      }
    </>
  )
}

export default Beginning
