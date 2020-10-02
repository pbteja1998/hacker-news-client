export default function StorySkeleton() {
  return (
    <>
      <div className='animate-pulse border border-gray-300 shadow rounded-md p-4 w-full max-w-sm sm:max-w-md md:max-w-full'>
        <div>
          <div>
            <a href='#' className='inline-block'>
              <span className='inline-flex items-center px-3 py-0.5 rounded-full bg-gray-200 w-24 h-6' />
            </a>
          </div>
          <a href='#' className='block'>
            <h3 className='mt-4 rounded bg-gray-400 w-2/3 h-4' />
            <p className='mt-2 w-3/4 h-4 rounded bg-gray-400' />
          </a>
          <div className='mt-3 flex items-center'>
            <div>
              <div className='flex text-sm leading-5 text-gray-500'>
                <time className='rounded bg-gray-400 w-20 h-3' />
                <span className='mx-1 rounded bg-gray-400 w-4 h-3' />
                <p className='rounded bg-gray-400 w-20 h-3' />
                <>
                  <span className='mx-1 rounded bg-gray-400 w-4 h-3' />
                  <a href={'#'} className='rounded bg-gray-400 w-20 h-3' />
                </>
              </div>
            </div>
          </div>
          <div className='flex items-center mt-1'>
            <div className='flex items-center'>
              <span className='mx-1 rounded bg-gray-400 w-4 h-4'></span>
              <p className='rounded bg-gray-400 w-32 h-4'></p>
            </div>
            <div className='flex items-center ml-4'>
              <span className='mx-1 rounded bg-gray-400 w-4 h-4'></span>
              <p className='bg-gray-400 w-24 h-4'></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
