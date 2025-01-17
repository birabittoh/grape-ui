import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Attachments from './Attachments.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Attachments />
  </StrictMode>,
)
