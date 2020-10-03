import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ListBox, Pagination, StoryView, StorySkeleton } from '.'

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

            <div className='flex space-x-4'>
              <div className='ml-auto w-40'>
                <ListBox
                  label='Sort By'
                  defaultOption='POPULARITY'
                  options={[
                    {
                      value: 'POPULARITY',
                      text: 'Popularity',
                    },
                    {
                      value: 'DATE',
                      text: 'Date',
                    },
                  ]}
                />
              </div>
              <div className='w-40 mr-auto:important sm:mr-0:important'>
                <ListBox
                  label='Show Only'
                  defaultOption='ALL_TIME'
                  options={[
                    {
                      value: 'ALL_TIME',
                      text: 'All Time',
                    },
                    {
                      value: 'LAST_24H',
                      text: 'Last 24 Hours',
                    },
                    {
                      value: 'PAST_WEEK',
                      text: 'Past Week',
                    },
                    {
                      value: 'PAST_MONTH',
                      text: 'Past Month',
                    },
                    {
                      value: 'PAST_YEAR',
                      text: 'Past Year',
                    },
                    {
                      value: 'CUSTOM_RANGE',
                      text: 'Custom Range',
                    },
                  ]}
                />
              </div>
            </div>

            {storyIds.map((storyId: number) => (
              <StoryView key={storyId} storyId={storyId} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
