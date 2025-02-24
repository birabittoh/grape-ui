import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Codes from './Codes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Codes />
  </StrictMode>,
)
