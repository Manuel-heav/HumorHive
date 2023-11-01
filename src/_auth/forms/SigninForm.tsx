import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"



export default function SigninForm() {
  const {toast} = useToast();
  const navigate = useNavigate();
  const {checkAuthUser, isLoading:isUserLoading} = useUserContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  })

  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();

  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if(!newUser){
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({
        title: "Sign in failed. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser()
    if(isLoggedIn){
      form.reset();

      navigate('/')

    }else{
     return toast({
        title: 'Sign up failed. Please try again.'
      })
    }
  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.png" width={140} height={120} />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 md:-mt-14">Create your account</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : "Register"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an Account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Sign In</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}


