import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { App } from '../components'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { createContext, useState } from 'react'

const queryCache = new QueryCache()

export const StoryContext = createContext<{
  selectedStoryId: number
  setSelectedStoryId: (storyId: number) => void
  isPanelOpen: boolean
  setIsPanelOpen: (open: boolean) => void
}>({
  selectedStoryId: 0,
  setSelectedStoryId: () => {},
  isPanelOpen: false,
  setIsPanelOpen: () => {},
})

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedStoryId, setSelectedStoryId] = useState(0)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <StoryContext.Provider
        value={{
          selectedStoryId,
          setSelectedStoryId,
          isPanelOpen,
          setIsPanelOpen,
        }}
      >
        <App>
          <Component {...pageProps} />
        </App>
      </StoryContext.Provider>
    </ReactQueryCacheProvider>
  )
}

export default MyApp
