import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Beginning from '../pages/Beginning'
import EditProfile from '../pages/editProfile/EditProfile'
import Register from '../pages/register/Register'
import Profile from '../pages/profile/Profile'
import Search from '../pages/search/Search'
import Notifications from '../pages/notifications/Notifications'
import ConfirmAccount from '../pages/confirmAccount/ConfirmAccount'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Beginning />
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
        path: '/edit/profile',
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
