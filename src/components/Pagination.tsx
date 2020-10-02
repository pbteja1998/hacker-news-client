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
        'cursor-pointer -mt-px border-t-2 pt-4 px-4 inline-flex items-center text-sm leading-5 font-medium focus:outline-none transition ease-in-out duration-150',
        isSelected
          ? 'border-orange-500 text-orange-600 focus:text-orange-800 focus:border-orange-700'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-400'
      )}
      onClick={() => setPage()}
    >
      {isPlaceHolder ? '...' : page}
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
  // const pages = Array.from(Array(10).keys())
  return (
    <>
      <nav className='sticky top-0 bg-white border-b border-gray-200 px-4 pb-4 flex items-center justify-between sm:px-0'>
        <div className='w-0 flex-1 flex'>
          <a
            className={classNames(
              '-mt-px border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150',
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
          </a>
        </div>
        <div className='hidden md:flex'>
          <PageNumber
            key={0}
            page={0}
            setPage={() => setCurrentPage(0)}
            isSelected={currentPage === 0}
          />
          <PageNumber
            key={1}
            page={1}
            setPage={() => setCurrentPage(1)}
            isSelected={currentPage === 1}
          />
          <PageNumber
            key={2}
            page={2}
            setPage={() => setCurrentPage(2)}
            isSelected={currentPage === 2}
          />

          <PageNumber
            isPlaceHolder={true}
            key={Math.floor(pagesCount / 2)}
            page={Math.floor(pagesCount / 2)}
            setPage={() => setCurrentPage(Math.floor(pagesCount / 2))}
            isSelected={currentPage === Math.floor(pagesCount / 2)}
          />

          <PageNumber
            key={pagesCount - 3}
            page={pagesCount - 3}
            setPage={() => setCurrentPage(pagesCount - 3)}
            isSelected={currentPage === pagesCount - 3}
          />
          <PageNumber
            key={pagesCount - 2}
            page={pagesCount - 2}
            setPage={() => setCurrentPage(pagesCount - 2)}
            isSelected={currentPage === pagesCount - 2}
          />
          <PageNumber
            key={pagesCount - 1}
            page={pagesCount - 1}
            setPage={() => setCurrentPage(pagesCount - 1)}
            isSelected={currentPage === pagesCount - 1}
          />
        </div>
        <div className='w-0 flex-1 flex justify-end'>
          <a
            className={classNames(
              '-mt-px border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150',
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
          </a>
        </div>
      </nav>
    </>
  )
}
