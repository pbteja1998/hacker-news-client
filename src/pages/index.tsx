import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { classNames } from '../utils'
import { App, Panel, Post, PostAlt } from '../components'
import { useQuery } from 'react-query'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { isLoading, error, data: storyIds } = useQuery('top-stories', () =>
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then((res) =>
      res.json()
    )
  )
  const [selectedStoryId, setSelectedStoryId] = useState(0)

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <App on={on} setOn={setOn}>
        <div className='bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
          <div className='relative max-w-lg mx-auto lg:max-w-7xl'>
            <div>
              <h2 className='text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10'>
                Recent publications
              </h2>
              <p className='mt-3 text-xl leading-7 text-gray-500 sm:mt-4'>
                Nullam risus blandit ac aliquam justo ipsum. Quam mauris
                volutpat massa dictumst amet. Sapien tortor lacus arcu.
              </p>
            </div>
            <div className='mt-12 grid gap-16 border-t-2 border-gray-100 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12'>
              {storyIds.map((storyId: number) =>
                on ? (
                  <PostAlt key={storyId} storyId={storyId} />
                ) : (
                  <Post
                    selectStory={() => setSelectedStoryId(storyId)}
                    key={storyId}
                    storyId={storyId}
                  />
                )
              )}
            </div>
            {selectedStoryId > 0 && <Panel storyId={selectedStoryId} />}
          </div>
        </div>
      </App>
    </>
  )
}
