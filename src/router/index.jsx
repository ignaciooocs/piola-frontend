import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import EditProfile from '../pages/editProfile/EditProfile'
import Register from '../pages/register/Register'
import Profile from '../pages/profile/Profile'
import Search from '../pages/search/Search'
import Notifications from '../pages/notifications/Notifications'
import ConfirmAccount from '../pages/confirmAccount/ConfirmAccount'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import RequireAuth from '../components/RequireAuth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <RequireAuth><Home /></RequireAuth>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/:username',
        element: <Profile />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/edit/profile/:username',
        element: <EditProfile />
      },
      {
        path: '/notifications',
        element: <Notifications />
      },
      {
        path: '/confirm/account/:token',
        element: <ConfirmAccount />
      }
    ]
  }
])
