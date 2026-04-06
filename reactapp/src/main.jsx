import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import App from './App.jsx'

const lastslash = window.location.pathname.lastIndexOf("/")
const basename = window.location.pathname.substring(0, lastslash);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter basename = {basename}>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
