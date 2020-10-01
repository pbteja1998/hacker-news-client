import { useQuery } from 'react-query'
import { Story } from '../types'
import { dateTimeString, timeOffset } from '../utils'

type Props = {
  storyId: number
  selectStory: () => void
}

export default function Post({ storyId, selectStory }: Props) {
  const { isLoading, error, data } = useQuery(`story-${storyId}-data`, () =>
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

  const story = data as Story

  return (
    <>
      <div>
        {/* <div>
          <a href='#' className='inline-block'>
            <span className='inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800'>
              {postType === PostType.ASK ? 'Ask' : 'Show'}
            </span>
          </a>
        </div> */}
        <a href='#' className='block'>
          <h3 className='mt-4 text-xl leading-7 font-semibold text-gray-900'>
            {story.title}
          </h3>
        </a>
        <div className='mt-1 flex items-center'>
          <div>
            {/* <p className='text-sm leading-5 font-medium text-gray-900'>
              <a href='#'>{story.by}</a>
            </p> */}
            <div className='flex text-sm leading-5 text-gray-500'>
              <p className='text-sm leading-5 font-medium text-gray-600'>
                <a href='#'>{story.by}</a>
              </p>
              <span className='mx-1'>&middot;</span>
              <time dateTime={dateTimeString(story.time)}>
                {timeOffset(story.time)}
              </time>
              <span className='mx-1'>&middot;</span>
              <span>6 min read</span>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          <a
            onClick={() => selectStory()}
            href='#'
            className='text-base leading-6 font-semibold text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150'
          >
            Read full story
          </a>
        </div>
      </div>
    </>
  )
}

// Post.PostType = PostType
