import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const LeftSidebar = () => {

  const {mutate: signOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate()

    const { user } = useUserContext();
    useEffect(() => {
        if(isSuccess){
            navigate(0)
        }   
    },[isSuccess])

  return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
            <Link to="/" className="flex gap-3 items-center">
                <img src="/assets/images/logo.png" className="-mt-8" width={100} height={40} />
            </Link>

            <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
              <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="" className='h-10 w-10 rounded-full' />

              <div className='flex flex-col'>
                <p className='body-bold'>{user.name}</p>
                <p className='small-regular text-light-3'>@{user.username}</p>
              </div>
            </Link>


            <ul className='flex flex-col gap-6'>
              <Link></Link>
              <Link></Link>
              <Link></Link>
              <Link></Link>
              <Link></Link>
              <Link></Link>
              <Link></Link>
            </ul>
        </div>
    </nav>
  )
}

export default LeftSidebar