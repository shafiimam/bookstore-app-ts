import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, ToastProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes';
import { Provider } from 'react-redux'
import store from './app/store'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider >
        <RouterProvider router={router} />
        <ToastProvider />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
