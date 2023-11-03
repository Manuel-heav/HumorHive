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
              <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="" className='h-14 w-14 rounded-full' />
            </Link>
        </div>
    </nav>
  )
}

export default LeftSidebar