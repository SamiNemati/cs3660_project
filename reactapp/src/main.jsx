import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import {EditProvider} from './contexts/EditContext'
import App from './App.jsx'

const lastslash = window.location.pathname.lastIndexOf("/")
const basename = window.location.pathname.substring(0, lastslash);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <EditProvider>
        <BrowserRouter basename = {basename}>
          <App />
        </BrowserRouter>
      </EditProvider>
    </AuthProvider>
  </StrictMode>,
)
