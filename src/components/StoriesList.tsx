import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ListBox, Pagination, StoryView, StorySkeleton } from '.'
import {
  ALL_TIME,
  FILTER_OPTIONS,
  POPULARITY,
  SORT_BY_OPTIONS,
} from '../constants'

export default function StoriesList({ urlKey }: { urlKey: string }) {
  const { isLoading, error, data: storyIds } = useQuery(urlKey, () =>
    fetch(`https://hacker-news.firebaseio.com/v0/${urlKey}.json`).then((res) =>
      res.json()
    )
  )

  const [currentPage, setCurrentPage] = useState(0)
  const [currentlySortBy, setCurrentlySortBy] = useState(POPULARITY)
  const [currentFilter, setCurrentFilter] = useState(ALL_TIME)

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
                  selectedOption={currentlySortBy}
                  setSelectedOption={setCurrentlySortBy}
                  options={SORT_BY_OPTIONS}
                />
              </div>
              <div className='w-40 mr-auto:important sm:mr-0:important'>
                <ListBox
                  label='Show Only'
                  selectedOption={currentFilter}
                  setSelectedOption={setCurrentFilter}
                  options={FILTER_OPTIONS}
                />
              </div>
            </div>

            {storyIds.map((storyId: number) => (
              <StoryView
                currentFilter={currentFilter}
                key={storyId}
                storyId={storyId}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
