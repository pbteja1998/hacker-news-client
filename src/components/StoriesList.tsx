import { useQuery } from 'react-query'
import { StoryView, StorySkeleton } from '../components'

export default function StoriesList({ urlKey }: { urlKey: string }) {
  const { isLoading, error, data: storyIds } = useQuery(urlKey, () =>
    fetch(`https://hacker-news.firebaseio.com/v0/${urlKey}.json`).then((res) =>
      res.json()
    )
  )

  if (error) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <div className='mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12'>
        {isLoading ? (
          <>
            <StorySkeleton />
            <StorySkeleton />
            <StorySkeleton />
            <StorySkeleton />
          </>
        ) : (
          storyIds.map((storyId: number) => (
            <StoryView key={storyId} storyId={storyId} />
          ))
        )}
      </div>
    </>
  )
}
