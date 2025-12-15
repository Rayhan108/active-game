import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ConfigProvider } from 'antd'
import router from './router/router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
    <RouterProvider router={router} />
    </ConfigProvider>

  </StrictMode>,
)
