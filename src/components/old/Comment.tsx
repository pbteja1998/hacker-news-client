import { useQuery } from 'react-query'

export default function OldComment({ commentId }: { commentId: number }) {
  const { isLoading, error, data } = useQuery(`comment-${commentId}-data`, () =>
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
    ).then((res) => res.json())
  )

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  const comment = data

  return (
    <>
      <p>Comment</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
