import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations"
import { timeAgo } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
const PostDetails = () => {
  const { id } = useParams()
  const {data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();

  const handleDeletePost = () => {

  }
  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img src={post?.imageUrl} className="post_details-img" alt="" />
          <div className="post_details-info">
            <div className="flex-between w-full">
            <Link to={`/profile/${post?.creator.$id}`} className="fkex items-center gap-3">
                    <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="Creator" className='rounded-full w-8 h-8 lg:h-10 lg:w-10' />

                <div className="flex flex-col">
                    <p className='base-medium lg:body-bold text-light-1'>{post?.creator.name}</p>

                    <div className='flex-center gap-2 text-light-3'>
                        <p className='subtle-semibold lg:small-regular'>{timeAgo(post?.$createdAt)}</p> -
                        <p className='subtle-semibold lg:small-regular'>{post?.location}</p>
                    </div>
                </div>
                </Link>

                <div className="flex-center gap-4">
                  <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                    <img src="/assets/icons/edit.svg" alt="" width={24} height={24}/>
                  </Link>

                  <Button onClick={handleDeletePost} variant="ghost" className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}>
                    <img src="/assets/icons/delete.svg" alt="" width={24} height={24} />
                  </Button>
                </div>
            </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails