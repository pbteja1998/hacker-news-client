import { Transition } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import { classNames } from '../../utils'
import {
  QueryCache,
  ReactQueryCacheProvider,
} from 'react-query'
import Toggle from './Toggle'

const queryCache = new QueryCache()

export default function OldApp({
  children,
  on,
  setOn,
}: {
  children: ReactNode
  on: boolean
  setOn: (on: boolean) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <div className='min-h-screen bg-white'>
          <nav className='bg-white border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex justify-between h-16'>
                <div className='flex'>
                  <div className='flex-shrink-0 flex items-center'>
                    <img
                      className='block lg:hidden h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-mark-on-white.svg'
                      alt='Workflow logo'
                    />
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-logo-on-white.svg'
                      alt='Workflow logo'
                    />
                  </div>
                  <div className='hidden sm:-my-px sm:ml-6 space-x-8 sm:flex'>
                    <a
                      href='#'
                      className='inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    >
                      Dashboard
                    </a>

                    <a
                      href='#'
                      className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                      Team
                    </a>

                    <a
                      href='#'
                      className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                      Projects
                    </a>

                    <a
                      href='#'
                      className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                      Calendar
                    </a>
                    <a
                      href='#'
                      className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                      <Toggle on={on} setOn={setOn} />
                    </a>
                  </div>
                </div>
                <div className='-mr-2 flex items-center sm:hidden'>
                  <button
                    className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
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
              className={classNames('sm:hidden', isOpen ? 'block' : 'hidden')}
            >
              <div className='pt-2 pb-3 space-y-1'>
                <a
                  href='#'
                  className='block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out'
                >
                  Dashboard
                </a>

                <a
                  href='#'
                  className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out'
                >
                  Team
                </a>

                <a
                  href='#'
                  className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out'
                >
                  Projects
                </a>

                <a
                  href='#'
                  className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out'
                >
                  Calendar
                </a>

                <Toggle on={on} setOn={setOn} />
              </div>
            </div>
          </nav>

          <div className='py-10'>
            <header>
              <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='text-3xl font-bold leading-tight text-gray-900'>
                  Dashboard
                </h1>
              </div>
            </header>
            <main>
              <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className='px-4 py-8 sm:px-0'>
                  <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'>
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </ReactQueryCacheProvider>
    </>
  )
}
