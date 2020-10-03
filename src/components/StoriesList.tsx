import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ListBox, Pagination, StoryView, StorySkeleton, Ring } from '.'
import {
  ALL_TIME,
  DATE,
  FILTER_OPTIONS,
  NUMBER_OF_COMMENTS,
  POPULARITY,
  SORT_BY_OPTIONS,
} from '../constants'

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
  const [currentFilter, setCurrentFilter] = useState(ALL_TIME)
  const [storyIds, setStoryIds] = useState<number[]>([])

  useEffect(() => {
    if (isLoading || error) {
      return
    }
    setStoryIds(data)
  }, [isLoading, error, data])

  useEffect(() => {
    if (Object.values(storiesMap).length === storyIds.length) {
      let sortedStoryNodes
      if (currentlySortBy === POPULARITY) {
        sortedStoryNodes = Object.values(storiesMap).sort(
          (a: StoryNode, b: StoryNode) => b.points - a.points
        )
      } else if (currentlySortBy === DATE) {
        sortedStoryNodes = Object.values(storiesMap).sort(
          (a: StoryNode, b: StoryNode) => b.time - a.time
        )
      } else if (currentlySortBy === NUMBER_OF_COMMENTS) {
        sortedStoryNodes = Object.values(storiesMap).sort(
          (a: StoryNode, b: StoryNode) => b.comments - a.comments
        )
      }
      setStoryIds(sortedStoryNodes.map((a: StoryNode) => a.storyId))
    }
  }, [storiesMap, currentlySortBy])

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

  const allStoryNodes = Object.values(storiesMap)

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
            <div className='absolute top-36 sm:top-24 sm:right-20'>
              {Object.values(storiesMap).length < storyIds.length ? (
                <Ring
                  className='ml-auto'
                  progress={Math.floor(
                    (Object.values(storiesMap).length * 100) / storyIds.length
                  )}
                />
              ) : (
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
          </>
        )}
      </div>
    </>
  )
}
