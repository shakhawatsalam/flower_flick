import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router";
import {
  useLazyFetchUserProfileQuery,
  useLogInMutation,
} from "@/redux/features/auth/authApi";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local_sotrage";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/features/user/userSlice";
import { useCreateCartMutation } from "@/redux/features/cart/cartApi";
import { addCart } from "@/redux/features/cart/cartSlice";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .nonempty({
      message: "Email is required.",
    }),
  password: z
    .string()
    .min(2, {
      message: "Password must be at least 2 characters.",
    })
    .nonempty({
      message: "Password is required.",
    }),
});

const Login = () => {
  const [logIn, { isLoading }] = useLogInMutation();
  const [createCart] = useCreateCartMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const [getMe] = useLazyFetchUserProfileQuery();
  const dispatch = useDispatch();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // This is where the user originally tried to go
  const from = location.state?.from?.pathname || "/";

  // Login
  async function onSubmit(values) {
    try {
      const loginResponse = await logIn(values).unwrap();
      if (loginResponse && loginResponse?.access) {
        setToLocalStorage("authToken", JSON.stringify(loginResponse?.access));
      }

      // Now fetch user data
      const token = getFromLocalStorage("authToken");
      if (token) {
        const userResponse = await getMe().unwrap();
        if (userResponse) {
          console.log("USER DATA =>", userResponse);
          dispatch(addUser(userResponse));

          // Create and set cart after successful login
          const cartResponse = await createCart().unwrap();
          if (cartResponse) {
            dispatch(addCart(cartResponse));
          }

          navigate(from, { replace: true }); // Redirect to intended route
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <div className='h-[60vh] flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-4xl font-playfair'>Login</h1>
        </div>
        <div className='w-[350px] text-gray-400 font-montserrat p-4 my-3'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-[#FFFFFF] h-16  focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                        placeholder='Email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-[#FFFFFF] h-16  focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                        placeholder='password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className='text-[14px]'>
                  If you don't have a account{" "}
                  <Link to='/signup' className='text-[#F34F3F] underline'>
                    Sing Up
                  </Link>
                </p>
              </div>
              <Button
                disabled={isLoading}
                className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-12 w-full uppercase'
                type='submit'>
                Log In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
