import { useQuery } from 'react-query'
import Link from 'next/link'
import { Job, Story, StoryType } from '../types'
import { dateTimeString, getDomain, timeOffset } from '../utils'
import { StorySkeleton } from '../components'
import { useContext } from 'react'
import { StoryContext } from '../pages/_app'

export default function StoryView({ storyId }: { storyId: number }) {
  const { isLoading, error, data } = useQuery(`story-${storyId}-data`, () =>
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    ).then((res) => res.json())
  )

  const { setSelectedStoryId, setIsPanelOpen } = useContext(StoryContext)

  if (isLoading) {
    return <StorySkeleton />
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  const story = data as Story | Job
  const storyType: StoryType =
    story.type === 'job'
      ? StoryType.JOB
      : story.url
      ? StoryType.SHOW
      : StoryType.ASK

  return (
    <>
      <div>
        <div>
          <Link
            href={
              storyType === StoryType.JOB
                ? '/jobs'
                : StoryType.SHOW
                ? '/show'
                : '/ask'
            }
          >
            <a className='inline-block'>
              <span className='inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-orange-100 text-orange-800'>
                {storyType === StoryType.JOB
                  ? 'Jobs HN'
                  : StoryType.SHOW
                  ? 'Show HN'
                  : 'Ask HN'}
              </span>
            </a>
          </Link>
        </div>
        <a
          className='block cursor-pointer'
          onClick={() => {
            setSelectedStoryId(storyId)
            setIsPanelOpen(true)
          }}
        >
          <h3 className='mt-4 text-xl leading-7 font-semibold text-gray-900'>
            {story.title}
          </h3>
          <p
            className='mt-3 text-base leading-6 text-gray-500'
            dangerouslySetInnerHTML={{
              __html: story.text ? story.text?.slice(0, 150) + '...' : '',
            }}
          />
        </a>
        <div className='mt-1 flex items-center'>
          <div>
            <div className='flex text-sm leading-5 text-gray-500'>
              <time dateTime={dateTimeString(story.time)}>
                {timeOffset(story.time)}
              </time>
              <span className='mx-1'>&middot;</span>
              <p className='text-sm leading-5 font-medium text-gray-700'>
                <a href='#'>{story.by}</a>
              </p>
              {storyType == StoryType.SHOW && (
                <>
                  <span className='mx-1'>&middot;</span>
                  <a href={story.url} className='underline'>
                    {getDomain(story.url || '')}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center mt-1'>
          {storyType !== StoryType.JOB && (
            <div className='flex items-center'>
              <svg
                className='w-5 h-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <a href='#' className='text-sm ml-1'>
                {(story as Story).descendants ?? 0} Comments
              </a>
            </div>
          )}

          <div className='flex items-center ml-4'>
            <svg
              className='w-5 h-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            <a href='#' className='text-sm ml-1'>
              {story.score ?? 0} Likes
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
