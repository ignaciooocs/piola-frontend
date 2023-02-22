import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Storie from './components/stories/Stories'
import WelcomeScreen from './components/WelcomeScreen'
import StorieProvider from './context/storieProvider'
import { useRefresh } from './hooks/useRefresh'
import { setUser } from './reducers/user/userSlice'

const App = () => {
  useRefresh(setUser)
  const [welcome, setWelcome] = useState(true)
  const { storie } = useSelector(state => state.openModal)
  const { token } = useSelector(state => state.user)

  useEffect(() => {
    setTimeout(() => setWelcome(false), 2000)
  }, [])
  if (token === false) {
    return <WelcomeScreen />
  }
  return (
    <div className={`${storie ? 'app' : 'App'}`}>
      <StorieProvider>
        {welcome && <WelcomeScreen />}
        {storie && <Storie />}
        {!storie &&
          <>
            <Navbar />
            <Outlet />
          </>}
      </StorieProvider>
    </div>
  )
}

export default App
