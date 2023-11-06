import React from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {
  const {pathname} = useLocation();
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
              <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="" className='h-8 w-8 rounded-full' />

              <div className='flex flex-col'>
                <p className='body-bold'>{user.name}</p>
                <p className='small-regular text-light-3'>@{user.username}</p>
              </div>
            </Link>


            <ul className='flex flex-col gap-2'>
             {sidebarLinks.map((link: INavLink) => {

              const isActive = pathname === link.route
              return (
                <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                    <NavLink to={link.route} className="flex gap-4 items-center p-3">
                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>
                  {link.label}
                </NavLink>
                </li>
              )
             })}
            </ul>
        </div>

        <Button 
        variant="ghost"    
        className='shad-button_ghost' onClick={()=> signOut()}>
                    <img src="/assets/icons/logout.svg" alt="" />
                    <p className='small-medium lg:base-medium'>Logout</p>
                </Button>
    </nav>
  )
}

export default LeftSidebar