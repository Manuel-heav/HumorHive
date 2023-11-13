import { useUserContext } from '@/context/AuthContext';
import { useDeleteSavedPost, useLikePost, useSavePost } from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite'
import { useState, useEffect } from 'react'


type PostStatsProps = {
    post: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id)

  const [likes, setLikes] = useState(likesList)
  const [isSaved, isSetSaved] = useState(false)

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();


  const { data: currentUser } = useUserContext()

  const handleLikePost = () => {}

  const handleSavePost = () => {}
  return (
    <div className='flex justify-between items-center z-20'>
        <div className="flex gap-2 mr-5">
            <img 
            src={`${checkIsLiked(likes,userId) ? 
              "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"}`} 
            alt="" 
            width={20} height={20} 
            onClick={() => {}} className='cursor-pointer'/>
            <p className='small-medium lg:base-medium'>0</p>
        </div>

        <div className="flex gap-2">
            <img src="/assets/icons/save.svg" alt="" width={20} height={20} onClick={() => {}} className='cursor-pointer'/>
            <p className='small-medium lg:base-medium'>0</p>
        </div>
    </div>
  )
}

export default PostStats