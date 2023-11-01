import {createContext, useContext, useEffect, useState} from 'react'
import { IContextType, IUser } from "@/types";



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
const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthUser = async () =>{
        try{
            const currentAccount = await getCurrentUser();
        }catch(err){
            console.log(err);
            return false;
        } finally{
            setIsLoading(false)
        }
    }
    const value = {
        user, 
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext