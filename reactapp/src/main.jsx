import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'

const lastslash = window.location.pathname.lastIndexOf("/")
const basename = window.location.pathname.substring(0, lastslash);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename = {basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
