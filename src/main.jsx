import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Importaciones de redux
import { Provider } from 'react-redux'
import store from './app/store'

// Importaciones de router
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
