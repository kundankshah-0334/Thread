import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"
import { ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { SocketContextProvider } from './Context/SocketContext.jsx'

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlfa.900')(props),
      bg: mode('gray.100', '#101010')(props),
    }
  })
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: '#616161',
    dark: '#1e1e1e',
  }
};

const theme = extendTheme({ config, styles, colors })


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>  this render each element twice in development it will be okay at production time
  <React.StrictMode>
  <RecoilRoot>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <SocketContextProvider>
        <App />
        </SocketContextProvider>
      </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
