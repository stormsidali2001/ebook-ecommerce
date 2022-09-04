import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../shared/utils/theme'
import { Provider } from 'react-redux'
import { store } from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
type CypressWindow = Window & typeof globalThis & {
  Cypress:any , store:any
}
let thisWindow = window as CypressWindow;
if(thisWindow.Cypress){
  console.log('CYPRESS WINDOW');
  thisWindow.store = store;
}
export default MyApp
