import { useQuery } from 'react-query'
import { Story } from '../../types'
import { dateTimeString, timeOffset } from '../../utils'

type Props = {
  storyId: number
}

export default function Post({ storyId }: Props) {
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
        <p className='text-sm leading-5 text-gray-500'>
          <time dateTime={dateTimeString(story.time)}>
            {timeOffset(story.time)}
          </time>
        </p>
        <a href='#' className='block'>
          <h3 className='mt-2 text-xl leading-7 font-semibold text-gray-900'>
            {story.title}
          </h3>
        </a>
      </div>
    </>
  )
}
