import { ReactNode, useContext, useState } from 'react'
import Head from 'next/head'
import classNames from 'classnames'
import { toTitleCase } from '../utils'
import { useRouter } from 'next/dist/client/router'
import Panel from './Panel'
import { SearchContext, StoryContext } from '../pages/_app'

export default function App({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const path = router.pathname.slice(1)
  const { selectedStoryId, isPanelOpen } = useContext(StoryContext)
  const { query, setQuery } = useContext(SearchContext)
  return (
    <>
      <Head>
        <title>
          Hacker News{' '}
          {router.pathname !== '/'
            ? ` | ${toTitleCase(router.pathname.slice(1))}`
            : ''}
        </title>
      </Head>
      <div className='min-h-screen bg-white'>
        <nav className='bg-white border-b border-gray-200'>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex items-center flex-shrink-0'>
                  <a
                    href='/'
                    className='cursor-pointer'
                    // onClick={() => router.push('/')}
                  >
                    <img
                      className='block w-auto h-8 lg:hidden'
                      src='data:image/png;base64,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'
                      alt='Y Combinator logo'
                    />
                    <img
                      className='hidden w-auto h-8 lg:block'
                      src='https://camo.githubusercontent.com/0e9f2aa88bff2fb34cc62acf017292ea6a4ac777/68747470733a2f2f636c6f756475702e636f6d2f634c534e5a58576d30706d2b'
                      alt='Y Combinator logo'
                    />
                  </a>
                </div>
                <div className='hidden space-x-8 sm:-my-px sm:ml-6 sm:flex'>
                  <a
                    href='/new'
                    className={classNames(
                      `cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm 
                        font-medium leading-5 transition duration-150 ease-in-out`,
                      router.pathname === '/new'
                        ? `border-orange-500  text-gray-900 focus:outline-none 
                          focus:border-orange-700`
                        : `border-transparent text-gray-500 hover:text-gray-700
                          hover:border-gray-300 focus:outline-none focus:text-gray-700
                         focus:border-gray-300`
                    )}
                    // onClick={() => router.push('/new')}
                  >
                    New
                    <span className='sm:hidden md:inline'>&nbsp;Stories</span>
                  </a>

                  <a
                    href='/ask'
                    className={classNames(
                      `cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm 
                        font-medium leading-5 transition duration-150 ease-in-out`,
                      router.pathname === '/ask'
                        ? `border-orange-500  text-gray-900 focus:outline-none 
                          focus:border-orange-700`
                        : `border-transparent text-gray-500 hover:text-gray-700
                          hover:border-gray-300 focus:outline-none focus:text-gray-700
                         focus:border-gray-300`
                    )}
                    // onClick={() => router.push('/ask')}
                  >
                    Ask
                    <span className='hidden md:inline'>&nbsp;Stories</span>
                  </a>

                  <a
                    href='/show'
                    className={classNames(
                      `cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm 
                        font-medium leading-5 transition duration-150 ease-in-out`,
                      router.pathname === '/show'
                        ? `border-orange-500  text-gray-900 focus:outline-none 
                          focus:border-orange-700`
                        : `border-transparent text-gray-500 hover:text-gray-700
                          hover:border-gray-300 focus:outline-none focus:text-gray-700
                         focus:border-gray-300`
                    )}
                    // onClick={() => router.push('/show')}
                  >
                    Show
                    <span className='hidden md:inline'>&nbsp;Stories</span>
                  </a>

                  <a
                    href='/jobs'
                    className={classNames(
                      `cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 text-sm 
                        font-medium leading-5 transition duration-150 ease-in-out`,
                      router.pathname === '/jobs'
                        ? `border-orange-500  text-gray-900 focus:outline-none 
                          focus:border-orange-700`
                        : `border-transparent text-gray-500 hover:text-gray-700
                          hover:border-gray-300 focus:outline-none focus:text-gray-700
                         focus:border-gray-300`
                    )}
                    // onClick={() => router.push('/jobs')}
                  >
                    Jobs
                    <span className='hidden md:inline'>&nbsp;Stories</span>
                  </a>
                </div>
              </div>
              <div className='flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end'>
                <div className='w-full max-w-lg lg:max-w-xs'>
                  <label htmlFor='search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        className='w-5 h-5 text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <input
                      id='search'
                      className='block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:border-orange-300 focus:shadow-outline-orange sm:text-sm'
                      placeholder='Search'
                      type='search'
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='flex items-center -mr-2 sm:hidden'>
                <button
                  className='inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    className={classNames(
                      'h-6 w-6',
                      isOpen ? 'hidden' : 'block'
                    )}
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                  <svg
                    className={classNames(
                      'h-6 w-6',
                      isOpen ? 'block' : 'hidden'
                    )}
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 24 24'
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
          </div>

          <div
            className={classNames(
              'relative z-10 bg-white sm:hidden',
              isOpen ? 'block' : 'hidden'
            )}
          >
            <div className='pt-2 pb-3 space-y-1'>
              <a
                href='/new'
                className={classNames(
                  `cursor-pointer block pl-3 pr-4 py-2 border-l-4 transition duration-150 ease-in-out`,
                  router.pathname === '/new'
                    ? `border-orange-500 text-base 
                    font-medium text-orange-700 bg-orange-50 focus:outline-none 
                    focus:text-orange-800 focus:bg-orange-100 
                    focus:border-orange-700 `
                    : `border-transparent text-base font-medium text-gray-600 
                      hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 
                      focus:outline-none focus:text-gray-800 focus:bg-gray-50 
                      focus:border-gray-300 `
                )}
                // onClick={() => router.push('/new')}
              >
                New Stories
              </a>

              <a
                href='/ask'
                className={classNames(
                  `cursor-pointer block pl-3 pr-4 py-2 border-l-4 transition duration-150 ease-in-out`,
                  router.pathname === '/ask'
                    ? `border-orange-500 text-base 
                    font-medium text-orange-700 bg-orange-50 focus:outline-none 
                    focus:text-orange-800 focus:bg-orange-100 
                    focus:border-orange-700 `
                    : `border-transparent text-base font-medium text-gray-600 
                      hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 
                      focus:outline-none focus:text-gray-800 focus:bg-gray-50 
                      focus:border-gray-300 `
                )}
                // onClick={() => router.push('/ask')}
              >
                Ask Stories
              </a>

              <a
                href='/show'
                className={classNames(
                  `cursor-pointer block pl-3 pr-4 py-2 border-l-4 transition duration-150 ease-in-out`,
                  router.pathname === '/show'
                    ? `border-orange-500 text-base 
                    font-medium text-orange-700 bg-orange-50 focus:outline-none 
                    focus:text-orange-800 focus:bg-orange-100 
                    focus:border-orange-700 `
                    : `border-transparent text-base font-medium text-gray-600 
                      hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 
                      focus:outline-none focus:text-gray-800 focus:bg-gray-50 
                      focus:border-gray-300 `
                )}
                // onClick={() => router.push('/show')}
              >
                Show Stories
              </a>

              <a
                href='/jobs'
                className={classNames(
                  `cursor-pointer block pl-3 pr-4 py-2 border-l-4 transition duration-150 ease-in-out`,
                  router.pathname === '/jobs'
                    ? `border-orange-500 text-base 
                    font-medium text-orange-700 bg-orange-50 focus:outline-none 
                    focus:text-orange-800 focus:bg-orange-100 
                    focus:border-orange-700 `
                    : `border-transparent text-base font-medium text-gray-600 
                      hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 
                      focus:outline-none focus:text-gray-800 focus:bg-gray-50 
                      focus:border-gray-300 `
                )}
                // onClick={() => router.push('/jobs')}
              >
                Jobs Stories
              </a>
            </div>
          </div>
        </nav>
        <div className='py-10'>
          <header>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold leading-tight text-gray-900'>
                {toTitleCase(path || 'Top')} Stories
              </h1>
            </div>
          </header>
          <main>
            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <div className='px-4 pb-8 sm:px-0'>
                <div className='rounded-lg h-96'>{children}</div>
              </div>
            </div>
          </main>
        </div>
        {selectedStoryId !== 0 && isPanelOpen && <Panel />}
      </div>
    </>
  )
}
