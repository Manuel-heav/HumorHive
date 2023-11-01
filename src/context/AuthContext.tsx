import {createContext, useContext, useEffect, useState} from 'react'
import { IContextType } from "@/types";



export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
}

const INITAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITAL_STATE)
const AuthContext = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext