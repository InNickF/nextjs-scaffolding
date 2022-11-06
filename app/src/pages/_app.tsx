import QueryProvider from '@/commons/services/managers/react-query'
import { ThemeProvider } from '@/commons/contexts/ThemeContext'
import { AppPropsWithLayout } from '@/commons/typings'
import '@/commons/styles/index.css'

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ThemeProvider>
      <QueryProvider>{getLayout(<Component {...pageProps} />)}</QueryProvider>
    </ThemeProvider>
  )
}

export default App
