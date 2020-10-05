import { useQuery } from 'react-query'
import { Comment } from '../types'
import { dateTimeString, timeOffset } from '../utils'

export default function CommentView({ commentId }: { commentId: number }) {
  const { isLoading, error, data } = useQuery(`comment-${commentId}-data`, () =>
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
    ).then((res) => res.json())
  )

  if (isLoading) {
    return (
      <div className='w-full max-w-sm p-4 my-10 border border-gray-300 rounded-md shadow'>
        <div className='flex space-x-4 animate-pulse'>
          <div className='flex-1 py-1 space-y-4'>
            <div className='w-3/4 h-4 bg-gray-400 rounded'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-400 rounded'></div>
              <div className='w-5/6 h-4 bg-gray-400 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <p>Something went wrong!!!</p>
  }

  const comment = data as Comment

  return (
    <div className='mt-5'>
      <div className='pb-4 pl-4 border-b border-l border-gray-200 rounded-b rounded-l'>
        <article
          className='prose'
          dangerouslySetInnerHTML={{
            __html: comment.text || '',
          }}
        />

        <div className='flex items-center mt-1'>
          <div>
            <div className='flex text-sm leading-5 text-gray-500'>
              <time dateTime={dateTimeString(comment.time)}>
                {timeOffset(comment.time)}
              </time>
              <span className='mx-1'>&middot;</span>
              <p className='text-sm font-medium leading-5 text-gray-700'>
                <a href='#'>{comment.by}</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ml-12'>
        {comment.kids?.map((subCommentId: number) => (
          <CommentView key={subCommentId} commentId={subCommentId} />
        ))}
      </div>
    </div>
  )
}
