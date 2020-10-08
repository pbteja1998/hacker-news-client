import { useQuery } from 'react-query'
import Link from 'next/link'
import { Job, Story, StoryType } from '../types'
import classNames from 'classnames'
import { dateTimeString, getDomain, timeOffset } from '../utils'
import { StorySkeleton } from '../components'
import { useContext, useEffect } from 'react'
import { SearchContext, StoryContext } from '../pages/_app'
import { ListBoxOption } from './ListBox'
import {
  ALL_TIME,
  LAST_24H,
  PAST_MONTH,
  PAST_WEEK,
  PAST_YEAR,
} from '../constants'

export default function StoryView({
  storyId,
  showCompleteStory = false,
  currentFilter = ALL_TIME,
  setStoryNode = () => {},
}: {
  storyId: number
  showCompleteStory?: boolean
  currentFilter?: ListBoxOption
  setStoryNode?: ({
    storyId,
    points,
    time,
    comments,
  }: {
    storyId: number
    points: number
    time: number
    comments: number
  }) => void
}) {
  const { isLoading, error, data } = useQuery(`story-${storyId}-data`, () =>
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    ).then((res) => res.json())
  )

  const { setSelectedStoryId, setIsPanelOpen } = useContext(StoryContext)
  const { query } = useContext(SearchContext)

  useEffect(() => {
    if (isLoading || error) {
      return
    }
    const story = data as Story | Job
    setStoryNode({
      storyId,
      points: story.score,
      time: story.time,
      comments:
        storyType === StoryType.JOB ? 0 : (story as Story).descendants ?? 0,
    })
  }, [isLoading, error, data])

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

  const openStory = () => {
    setSelectedStoryId(storyId)
    setIsPanelOpen(true)
  }

  const isVisible = () => {
    if (isLoading || error) {
      return true
    }
    return (
      story.title?.toLowerCase().includes(query.toLowerCase()) ||
      story.text?.toLowerCase().includes(query.toLowerCase()) ||
      story.by?.toLowerCase().includes(query.toLowerCase()) ||
      story.url?.toLowerCase().includes(query.toLowerCase())
    )
  }

  const shouldShow = () => {
    if (isLoading || error) {
      return true
    }

    const timestampToday = Math.round(new Date().getTime() / 1000)
    const timestampYesterday = timestampToday - 24 * 3600
    const timestampAWeekAgo = timestampToday - 7 * 24 * 3600
    const timestampAMonthAgo = timestampToday - 30 * 24 * 3600
    const timestampAYearAgo = timestampToday - 365 * 24 * 3600

    switch (currentFilter) {
      case ALL_TIME:
        return true

      case LAST_24H:
        return story.time >= timestampYesterday

      case PAST_WEEK:
        return story.time >= timestampAWeekAgo

      case PAST_MONTH:
        return story.time >= timestampAMonthAgo

      case PAST_YEAR:
        return story.time >= timestampAYearAgo

      default:
        return false
    }
  }

  if (!shouldShow() || !isVisible()) {
    return <></>
  }

  return (
    <>
      <div id={`story-${storyId}`}>
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
                  : storyType === StoryType.SHOW
                  ? 'Show HN'
                  : 'Ask HN'}
              </span>
            </a>
          </Link>
        </div>
        <a className='block cursor-pointer' onClick={() => openStory()}>
          <h3 className='mt-4 text-xl font-semibold leading-7 text-gray-900'>
            {story.title}
          </h3>
          <article
            className='mt-1 text-base leading-6 text-gray-500'
            dangerouslySetInnerHTML={{
              __html: story.text
                ? showCompleteStory
                  ? story.text
                  : story.text?.slice(0, 150) + '...'
                : '',
            }}
          />
        </a>
        <div className='flex items-center mt-1'>
          <div>
            <div className='flex text-sm leading-5 text-gray-500'>
              {storyType == StoryType.SHOW && (
                <>
                  <a
                    href={story.url}
                    className='underline'
                    target='_blank'
                    rel='noopener noreferrer nofollow'
                  >
                    {getDomain(story.url || '')}
                  </a>
                  <span className='mx-1'>&middot;</span>
                </>
              )}

              <a
                href={`https://news.ycombinator.com/user?id=${story.by}`}
                target='_blank'
                rel='noopener noreferrer nofollow'
                className='flex items-center text-sm font-medium leading-5 text-gray-700 cursor-pointer'
              >
                <svg
                  className='w-4 h-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clipRule='evenodd'
                  />
                </svg>
                <p className='ml-1 hover:underline'>{story.by}</p>
              </a>
              <span className='mx-1'>&middot;</span>
              <time dateTime={dateTimeString(story.time)}>
                {timeOffset(story.time)}
              </time>
            </div>
          </div>
        </div>
        <div className='flex items-center mt-1'>
          {storyType !== StoryType.JOB && (
            <div
              className='flex items-center cursor-pointer'
              onClick={() => openStory()}
            >
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
                  d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                />
              </svg>
              <a className='ml-1 text-sm'>
                {(story as Story).descendants ?? 0} Comments
              </a>
            </div>
          )}

          <div
            className={classNames(
              'flex items-center cursor-pointer',
              storyType !== StoryType.JOB && 'ml-4'
            )}
            onClick={() => openStory()}
          >
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
            <a className='ml-1 text-sm'>{story.score ?? 0} Likes</a>
          </div>
        </div>
      </div>
    </>
  )
}
