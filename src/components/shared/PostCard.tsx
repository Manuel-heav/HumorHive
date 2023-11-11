import { Models } from 'appwrite';
import React from 'react'
import { Link } from 'react-router-dom';

type PostCardProps = {
    post: Models.Document;
}

const PostCard = ({ post } : PostCardProps) => {
  return (
    <div className='post-card'>
        <div className="flex-between">
            <div className="flex item-center gap-3">
                <Link to={`/profile/${post.creator.$id}`}>
                    <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="Creator" className='rounded-full w-10 lg:h-10' />
                </Link>

                <div className="flex flex-col">
                    <p>{post.creator.name}</p>

                    <div>
                        <p>{post.$createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard