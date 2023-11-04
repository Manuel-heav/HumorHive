import './globals.css';
import {Routes, Route} from 'react-router-dom'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home } from './_root/pages'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout/>}>
            {/* Putting them in a not selfclosing tags allows me to have a common structure for them like the the AuthLayout */}
            <Route path="/sign-in" element={<SigninForm />}/>
            <Route path="/sign-up" element={<SignupForm />}/>
          </Route>
          {/* Sign Up and Sign In only users can see */}
          {/*  */}
          {/* Private Routes */}
          {/* Only Logged in Users see */}
          <Route element={<RootLayout />}>
              <Route index element={<Home />}/>
          </Route>

        </Routes>

        <Toaster />
    </main>
  )
}

export default App