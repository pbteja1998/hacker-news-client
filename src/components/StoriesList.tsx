import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { StoryView, StorySkeleton } from '../components'
import Pagination from './Pagination'

export default function StoriesList({ urlKey }: { urlKey: string }) {
  const { isLoading, error, data: storyIds } = useQuery(urlKey, () =>
    fetch(`https://hacker-news.firebaseio.com/v0/${urlKey}.json`).then((res) =>
      res.json()
    )
  )

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    if (isLoading || error) {
      return
    }
    const storyId = storyIds[currentPage * 10]
    const element = document.getElementById(`story-${storyId}`)
    if (element) {
      element.scrollIntoView()
    }
  }, [currentPage])

  if (error) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <div className='mt-6 grid gap-16 border-t-2 border-transparent pt-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12'>
        {isLoading ? (
          <>
            <StorySkeleton />
            <StorySkeleton />
            <StorySkeleton />
            <StorySkeleton />
          </>
        ) : (
          <>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagesCount={Math.ceil(storyIds.length / 10)}
            />
            {storyIds.map((storyId: number) => (
              <StoryView key={storyId} storyId={storyId} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
