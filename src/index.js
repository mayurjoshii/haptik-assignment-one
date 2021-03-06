import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import './index.css'
import App from './App'

import { theme, StyledGlobal } from './styles'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>

    <StyledGlobal />
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
