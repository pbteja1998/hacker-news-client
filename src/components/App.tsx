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

      <footer className='fixed bottom-0 z-10 w-screen bg-white border-t'>
        <div className='max-w-screen-xl px-4 py-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-8'>
          <div className='flex justify-center space-x-6 md:order-2'>
            <a
              href='https://blog.bhanuteja.dev'
              className='relative text-gray-400 hover:text-gray-500'
              target='_blank'
              style={{ bottom: '0.19rem' }}
            >
              <span className='sr-only'>Bhanu Teja Pachipulusu's Blog</span>
              <img
                className='w-8 opacity-30 hover:opacity-100'
                src='/b-logo.png'
              />
            </a>
            <a
              href='https://bhanuteja.dev'
              className='text-gray-400 hover:text-gray-500'
              target='_blank'
            >
              <span className='sr-only'>
                Bhanu Teja Pachipulusu's Personal Website
              </span>
              <svg
                className='w-6 h-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                />
              </svg>
            </a>
            <a
              href='https://hashnode.com/@pbteja1998'
              className='text-gray-400 hover:text-gray-500'
              target='_blank'
              rel='noopener noreferrer nofollow'
            >
              <span className='sr-only'>Hashnode</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                viewBox='0 0 337 337'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M23.155 112.598c-30.873 30.874-30.873 80.93 0 111.804l89.443 89.443c30.874 30.873 80.93 30.873 111.804 0l89.443-89.443c30.873-30.874 30.873-80.93 0-111.804l-89.443-89.443c-30.874-30.873-80.93-30.873-111.804 0l-89.443 89.443zm184.476 95.033c21.612-21.611 21.612-56.651 0-78.262-21.611-21.612-56.651-21.612-78.262 0-21.612 21.611-21.612 56.651 0 78.262 21.611 21.612 56.651 21.612 78.262 0z'
                />
              </svg>
            </a>
            <a
              href='https://twitter.com/pbteja1998'
              className='text-gray-400 hover:text-gray-500'
              target='_blank'
              rel='noopener noreferrer nofollow'
            >
              <span className='sr-only'>Twitter</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </a>
            <a
              href='https://github.com/pbteja1998'
              className='text-gray-400 hover:text-gray-500'
              target='_blank'
              rel='noopener noreferrer nofollow'
            >
              <span className='sr-only'>GitHub</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a
              href='https://github.com/pbteja1998'
              className='text-gray-400 hover:text-gray-500'
              target='_blank'
              rel='noopener noreferrer nofollow'
            >
              <span className='sr-only'>LinkedIn</span>
              <svg
                style={{ width: '1.2rem' }}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
              </svg>
            </a>
          </div>
          <div className='mt-2 md:mt-0 md:order-1'>
            <p className='text-base leading-6 prose text-center text-gray-400'>
              &copy; 2020 Made with 🧡 by{' '}
              <a href='https://blog.bhanuteja.dev'>Bhanu Teja</a>.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
