export default function StorySkeleton() {
  return (
    <>
      <div className='w-full max-w-sm p-4 border border-gray-300 rounded-md shadow animate-pulse sm:max-w-md md:max-w-full'>
        <div>
          <div>
            <a href='#' className='inline-block'>
              <span className='inline-flex items-center px-3 py-0.5 rounded-full bg-gray-200 w-24 h-6' />
            </a>
          </div>
          <a href='#' className='block'>
            <h3 className='w-2/3 h-4 mt-4 bg-gray-400 rounded' />
            <p className='w-3/4 h-4 mt-2 bg-gray-400 rounded' />
          </a>
          <div className='flex items-center mt-3'>
            <div>
              <div className='flex text-sm leading-5 text-gray-500'>
                <time className='w-20 h-3 bg-gray-400 rounded' />
                <span className='w-4 h-3 mx-1 bg-gray-400 rounded' />
                <p className='w-20 h-3 bg-gray-400 rounded' />
                <>
                  <span className='w-4 h-3 mx-1 bg-gray-400 rounded' />
                  <a href={'#'} className='w-20 h-3 bg-gray-400 rounded' />
                </>
              </div>
            </div>
          </div>
          <div className='flex items-center mt-1'>
            <div className='flex items-center'>
              <span className='w-4 h-4 mx-1 bg-gray-400 rounded'></span>
              <p className='w-32 h-4 bg-gray-400 rounded'></p>
            </div>
            <div className='flex items-center ml-4'>
              <span className='w-4 h-4 mx-1 bg-gray-400 rounded'></span>
              <p className='w-24 h-4 bg-gray-400'></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
