import { ChakraProvider } from '@chakra-ui/react'
import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DonatesProvider } from './context/donates'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <DonatesProvider>
        <App />
      </DonatesProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
