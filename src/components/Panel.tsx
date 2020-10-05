import { Transition } from '@headlessui/react'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { StoryContext } from '../pages/_app'
import { Story } from '../types'
import CommentView from './CommentView'
import StoryView from './StoryView'

export default function Panel() {
  const {
    selectedStoryId,
    isPanelOpen: isOpen,
    setIsPanelOpen: setIsOpen,
  } = useContext(StoryContext)
  const { isLoading, error, data } = useQuery(
    `story-${selectedStoryId}-data`,
    () =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${selectedStoryId}.json`
      ).then((res) => res.json())
  )

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  const story = data as Story

  if (selectedStoryId === 0) {
    return <></>
  }

  return (
    <>
      <div className='fixed top-0 bottom-0 right-0 w-full overflow-hidden sm:w-2/3 md:w-7/12'>
        <div className='absolute inset-0 overflow-hidden'>
          <section className='absolute inset-y-0 right-0 flex max-w-full pl-2'>
            {isOpen && (
              <Transition
                show={isOpen}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
                className='w-screen'
              >
                <div className='flex flex-col h-full py-6 space-y-6 overflow-y-scroll bg-white shadow-xl'>
                  <header className='px-4 sm:px-6'>
                    <div className='flex items-start justify-between space-x-3'>
                      <StoryView storyId={story.id} showCompleteStory={true} />
                      <div className='flex items-center h-7'>
                        <button
                          onClick={() => setIsOpen(false)}
                          aria-label='Close panel'
                          className='text-gray-400 transition duration-150 ease-in-out hover:text-gray-500'
                        >
                          {/* <!-- Heroicon name: x --> */}
                          <svg
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </header>
                  <div className='relative flex-1 px-4 sm:px-6'>
                    {/* <!-- Replace with your content --> */}
                    <div className='absolute inset-0 px-4 sm:px-6'>
                      <div className='h-full border-2 border-transparent border-dashed'>
                        <div className='mt-4'>
                          {story.kids?.map((subCommentId: number) => (
                            <CommentView
                              key={subCommentId}
                              commentId={subCommentId}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* <!-- /End replace --> */}
                  </div>
                </div>
              </Transition>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
