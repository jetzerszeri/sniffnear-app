import { PostCard } from './PostCard';

export const PostCardsList = ( { data } ) => {
  return (
    <ul className="blogPostsList">
        {
            data.map( post => (
                <PostCard
                    key={ post._id }
                    data={ post }
                />
            ))
        }
    </ul>
  )
}
