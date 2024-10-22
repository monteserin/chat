import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserProvider from './providers/UserProvider.jsx'
import { GlobalStyle } from './App.styles.js'
import { App as AntdApp, ConfigProvider } from 'antd';



const theme = {
  token: {
    colorPrimary: '#f77754',
    colorSecondary: 'rgb(164, 209, 200)',
    // colorBgContainer: monteserinTheme.secondaryColor,
    // colorBorder: monteserinTheme.primaryColor,
    // colorText: monteserinTheme.primaryColor,

  },
  components: {
    Button: {
      // Si es necesario, asegúrate de que los botones primary no tengan sombra

    },
  },
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <UserProvider>
        <GlobalStyle />
        <AntdApp >
          <App />
        </AntdApp>
      </UserProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
