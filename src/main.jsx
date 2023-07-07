import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Importaciónes de redux
import { Provider } from 'react-redux'
import store from './app/store'

// Importaciónes de router
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'

// importaciónes de react-query
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
)
