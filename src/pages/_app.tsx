import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { App } from '../components'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

const queryCache = new QueryCache()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App>
        <Component {...pageProps} />
      </App>
    </ReactQueryCacheProvider>
  )
}

export default MyApp
