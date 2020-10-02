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
      <div className='border border-gray-300 shadow rounded-md p-4 max-w-sm w-full my-10'>
        <div className='animate-pulse flex space-x-4'>
          <div className='flex-1 space-y-4 py-1'>
            <div className='h-4 bg-gray-400 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-400 rounded'></div>
              <div className='h-4 bg-gray-400 rounded w-5/6'></div>
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
  console.log({ comment })

  return (
    <div className='mt-5'>
      <div className='border-l border-b rounded-b rounded-l border-gray-200 pl-4 pb-4'>
        <article
          className='prose'
          dangerouslySetInnerHTML={{
            __html: comment.text || '',
          }}
        />

        <div className='mt-1 flex items-center'>
          <div>
            <div className='flex text-sm leading-5 text-gray-500'>
              <time dateTime={dateTimeString(comment.time)}>
                {timeOffset(comment.time)}
              </time>
              <span className='mx-1'>&middot;</span>
              <p className='text-sm leading-5 font-medium text-gray-700'>
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
