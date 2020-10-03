import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ListBox, Pagination, StoryView, StorySkeleton, Ring } from '.'
import {
  ALL_TIME,
  ASCENDING,
  DATE,
  DESCENDING,
  FILTER_OPTIONS,
  NUMBER_OF_COMMENTS,
  ORDER_IN_OPTIONS,
  POPULARITY,
  SORT_BY_OPTIONS,
} from '../constants'

const PAGE_SIZE = 10
const STORIES_OFFSET = 50

export default function StoriesList({ urlKey }: { urlKey: string }) {
  const { isLoading, error, data } = useQuery(urlKey, () =>
    fetch(`https://hacker-news.firebaseio.com/v0/${urlKey}.json`).then((res) =>
      res.json()
    )
  )

  type StoryNode = {
    storyId: number
    points: number
    time: number
    comments: number
  }

  const [storiesMap, setStoriesMap] = useState<Record<number, StoryNode>>({})

  const setStoryNode = ({
    storyId,
    points,
    time,
    comments,
  }: {
    storyId: number
    points: number
    time: number
    comments: number
  }) =>
    setStoriesMap({
      ...storiesMap,
      [storyId]: { storyId, points, time, comments },
    })

  const [currentPage, setCurrentPage] = useState(0)
  const [currentlySortBy, setCurrentlySortBy] = useState(POPULARITY)
  const [currentlyOrderIn, setCurrentlyOrderIn] = useState(DESCENDING)
  const [currentFilter, setCurrentFilter] = useState(ALL_TIME)
  const [storyIds, setStoryIds] = useState<number[]>([])

  const [totalStories, setTotalStories] = useState(STORIES_OFFSET)

  useEffect(() => {
    if (isLoading || error) {
      return
    }
    setStoryIds(data.slice(0, totalStories))
  }, [isLoading, error, data, totalStories])

  useEffect(() => {
    const multiplicationFactor = currentlyOrderIn === ASCENDING ? -1 : 1
    if (Object.values(storiesMap).length === storyIds.length) {
      let sortedStoryNodes
      if (currentlySortBy === POPULARITY) {
        sortedStoryNodes = Object.values(storiesMap).sort(
          (a: StoryNode, b: StoryNode) =>
            multiplicationFactor * (b.points - a.points)
        )
      } else if (currentlySortBy === DATE) {
        sortedStoryNodes = Object.values(storiesMap).sort(
          (a: StoryNode, b: StoryNode) =>
            multiplicationFactor * (b.time - a.time)
        )
      } else if (currentlySortBy === NUMBER_OF_COMMENTS) {
        sortedStoryNodes = Object.values(storiesMap).sort(
          (a: StoryNode, b: StoryNode) =>
            multiplicationFactor * (b.comments - a.comments)
        )
      }
      setStoryIds(sortedStoryNodes.map((a: StoryNode) => a.storyId))
    }
  }, [storiesMap, currentlySortBy])

  useEffect(() => {
    if (isLoading || error) {
      return
    }
    const storyId = storyIds[currentPage * PAGE_SIZE]
    const element = document.getElementById(`story-${storyId}`)
    if (element) {
      element.scrollIntoView()
    }
  }, [currentPage])

  if (error) {
    return <p>Something went wrong</p>
  }

  const allStoryNodes = Object.values(storiesMap)

  return (
    <>
      <div className='mt-6 grid gap-16 py-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12'>
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
              pagesCount={Math.ceil(storyIds.length / PAGE_SIZE)}
            />
            <div className='absolute top-36 sm:top-24 sm:right-20'>
              {Object.values(storiesMap).length < storyIds.length ? (
                <Ring
                  className='ml-auto'
                  progress={Math.floor(
                    (Object.values(storiesMap).length * 100) / storyIds.length
                  )}
                />
              ) : (
                <div className='flex flex-wrap space-x-4'>
                  <div className='w-32 sm:w-40'>
                    <ListBox
                      label='Order In'
                      selectedOption={currentlyOrderIn}
                      setSelectedOption={setCurrentlyOrderIn}
                      options={ORDER_IN_OPTIONS}
                    />
                  </div>
                  <div className='w-32 sm:w-40'>
                    <ListBox
                      label='Sort By'
                      selectedOption={currentlySortBy}
                      setSelectedOption={setCurrentlySortBy}
                      options={SORT_BY_OPTIONS}
                    />
                  </div>
                  <div className='w-32 sm:w-40 mr-auto:important sm:mr-0:important'>
                    <ListBox
                      label='Show Only'
                      selectedOption={currentFilter}
                      setSelectedOption={setCurrentFilter}
                      options={FILTER_OPTIONS}
                    />
                  </div>
                </div>
              )}
            </div>

            {storyIds.map((storyId: number) => (
              <StoryView
                currentFilter={currentFilter}
                key={storyId}
                storyId={storyId}
                setStoryNode={setStoryNode}
              />
            ))}

            <span className='text-center rounded-md'>
              <button
                type='button'
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition ease-in-out duration-150'
                onClick={() => setTotalStories(totalStories + STORIES_OFFSET)}
              >
                Show More
              </button>
            </span>
          </>
        )}
      </div>
    </>
  )
}
