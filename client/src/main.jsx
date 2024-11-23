import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {RouterProvider} from 'react-router-dom'
import router from './routers/router'
import {Provider} from 'react-redux'
import { store } from './redux/store'
import { AuthProvider } from './context/AuthUser'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </AuthProvider>
  </StrictMode>,
)
