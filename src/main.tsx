import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, ToastProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider >
      <RouterProvider router={router} />
      <ToastProvider/>
    </ChakraProvider>
  </React.StrictMode>,
)
