import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import Comment from './Comment'

export default function Panel({ storyId }: { storyId: number }) {
  const [isOpen, setIsOpen] = useState(true)
  const { isLoading, error, data: story } = useQuery(
    `story-${storyId}-data`,
    () =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
      ).then((res) => res.json())
  )

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <section className='absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16'>
            {isOpen && (
              <Transition
                show={isOpen}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
                className='w-screen max-w-2xl'
              >
                <div className='h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll'>
                  <header className='px-4 sm:px-6'>
                    <div className='flex items-start justify-between space-x-3'>
                      <h2 className='text-lg leading-7 font-medium text-gray-900'>
                        Panel title
                      </h2>
                      <div className='h-7 flex items-center'>
                        <button
                          onClick={() => setIsOpen(false)}
                          aria-label='Close panel'
                          className='text-gray-400 hover:text-gray-500 transition ease-in-out duration-150'
                        >
                          {/* <!-- Heroicon name: x --> */}
                          <svg
                            className='h-6 w-6'
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
                      <div className='h-full border-2 border-dashed border-gray-200'>
                        <Comment commentId={8863} />
                        <Comment commentId={9224} />
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
