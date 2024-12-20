import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'swiper/css/bundle';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
