import { useEffect, useState } from 'react'
import { classNames } from '../utils'

const PageNumber = ({
  page,
  setPage,
  isSelected,
  isPlaceHolder = false,
}: {
  page: number
  setPage: () => void
  isSelected: boolean
  isPlaceHolder?: boolean
}) => {
  return (
    <a
      className={classNames(
        `ml-2 cursor-pointer -mt-px border-b-2 pt-4 px-4 inline-flex 
        items-center text-sm leading-5 font-medium focus:outline-none 
        transition ease-in-out duration-150`,
        isSelected
          ? `border-orange-500 text-orange-600 focus:text-orange-800 
          focus:border-orange-700`
          : `border-transparent text-gray-500 hover:text-gray-700 
          hover:border-gray-300 focus:text-gray-700 focus:border-gray-400`
      )}
      onClick={() => setPage()}
    >
      {isPlaceHolder ? '...' : page + 1}
    </a>
  )
}

export default function Pagination({
  pagesCount,
  currentPage,
  setCurrentPage,
}: {
  pagesCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
}) {
  const [input, setInput] = useState(currentPage + 1)
  const leftMiddlePage = () => Math.floor((2 + currentPage) / 2)
  const rightMiddlePage = () => Math.floor((currentPage + pagesCount - 3) / 2)
  useEffect(() => {
    setInput(currentPage + 1)
  }, [currentPage])

  return (
    <>
      <nav
        className={`sticky top-0 bg-white border-b border-gray-200 px-4
          flex items-center justify-between sm:px-0`}
      >
        <div className='w-0 flex-1 flex'>
          <button
            className={classNames(
              `-mt-px border-b-2 border-transparent pt-4 pb-2 px-3 inline-flex 
              items-center text-sm leading-5 font-medium text-gray-500 
              hover:text-gray-700 focus:outline-none focus:text-gray-700 
              transition ease-in-out duration-150`,
              currentPage > 0 ? 'cursor-pointer' : 'cursor-not-allowed'
            )}
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          >
            <svg
              className='mr-3 h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Previous
          </button>
        </div>
        <div className='hidden md:flex'>
          <PageNumber
            key={'page-0'}
            page={0}
            setPage={() => setCurrentPage(0)}
            isSelected={currentPage === 0}
          />
          <PageNumber
            key={'page-1'}
            page={1}
            setPage={() => setCurrentPage(1)}
            isSelected={currentPage === 1}
          />
          <PageNumber
            key={'page-2'}
            page={2}
            setPage={() => setCurrentPage(2)}
            isSelected={currentPage === 2}
          />

          {leftMiddlePage() > 2 && leftMiddlePage() < currentPage && (
            <PageNumber
              isPlaceHolder={true}
              key={'left-middle-page'}
              page={leftMiddlePage()}
              setPage={() => setCurrentPage(leftMiddlePage())}
              isSelected={false}
            />
          )}

          <div className='mt-1 mx-2 relative shadow-sm' key={'input'}>
            <input
              className='form-input rounded-sm block w-12 mt-3 sm:text-sm sm:leading-5 text-orange-600 focus:text-orange-800'
              placeholder='25'
              value={input}
              onChange={(e) => {
                if (!isNaN(+e.target.value)) {
                  setInput(+e.target.value)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setCurrentPage(input - 1)
                }
              }}
              onBlur={() => setCurrentPage(input - 1)}
            />
          </div>

          {rightMiddlePage() > currentPage &&
            rightMiddlePage() < pagesCount - 3 && (
              <PageNumber
                isPlaceHolder={true}
                key={'right-middle-page'}
                page={rightMiddlePage()}
                setPage={() => setCurrentPage(rightMiddlePage())}
                isSelected={false}
              />
            )}

          <PageNumber
            key={`page - ${pagesCount - 3}`}
            page={pagesCount - 3}
            setPage={() => setCurrentPage(pagesCount - 3)}
            isSelected={currentPage === pagesCount - 3}
          />
          <PageNumber
            key={`page - ${pagesCount - 2}`}
            page={pagesCount - 2}
            setPage={() => setCurrentPage(pagesCount - 2)}
            isSelected={currentPage === pagesCount - 2}
          />
          <PageNumber
            key={`page - ${pagesCount - 1}`}
            page={pagesCount - 1}
            setPage={() => setCurrentPage(pagesCount - 1)}
            isSelected={currentPage === pagesCount - 1}
          />
        </div>
        <div className='w-0 flex-1 flex justify-end'>
          <button
            className={classNames(
              `-mt-px border-b-2 border-transparent pt-4 pb-2 px-3 inline-flex 
              items-center text-sm leading-5 font-medium text-gray-500 
              hover:text-gray-700 focus:outline-none focus:text-gray-700 
              transition ease-in-out duration-150`,
              currentPage < pagesCount - 1
                ? 'cursor-pointer'
                : 'cursor-not-allowed'
            )}
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, pagesCount - 1))
            }
          >
            Next
            <svg
              className='ml-3 h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  )
}
