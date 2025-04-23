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
import { Link, useNavigate } from "react-router";
import { useSignUpMutation } from "@/redux/features/auth/authApi";

// Zod schema for form validation
const formSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .nonempty({ message: "Email is required." }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 6 characters." })
      .nonempty({ message: "Password is required." }),
    confirmPassword: z
      .string()
      .min(4, { message: "Confirm password must be at least 6 characters." })
      .nonempty({ message: "Confirm password is required." }),
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." })
      .nonempty({ message: "First name is required." }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." })
      .nonempty({ message: "Last name is required." }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters." })
      .nonempty({ message: "Address is required." }),
    phone: z.string().nonempty({ message: "Phone is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Show error on confirmPassword field
  });

const Signup = () => {
  const [signUp, { data, error }] = useSignUpMutation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
    },
  });

  async function onSubmit(values) {
    try {
      // Remove confirmPassword from the payload since the API likely doesn't need it
      const { confirmPassword, ...payload } = values;
      const signInResponse = await signUp(payload).unwrap();
      if (signInResponse) {
        navigate("/check-email", { state: { email: values.email } });
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }
  console.log(data);
  console.log(error);

  return (
    <section>
      <div className='flex flex-col justify-center items-center my-5'>
        <div>
          <h1 className='text-4xl font-playfair'>Sign Up</h1>
        </div>
        <div className='w-[350px] md:w-[550px] text-gray-400 font-montserrat p-4 my-3'>
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
                        className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
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
                        className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                        placeholder='Password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password*</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                        placeholder='Confirm password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col md:flex-row justify-between gap-3'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className='md:w-[50%]'>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input
                          className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                          placeholder='First name'
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='md:w-[50%]'>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input
                          className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                          placeholder='Last name'
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                        placeholder='Address'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
                        placeholder='Phone'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className='text-[14px]'>
                  If you have an account{" "}
                  <Link to='/login' className='text-[#F34F3F] underline mx-3'>
                    Log in
                  </Link>
                </p>
              </div>
              <Button
                className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-12 w-full uppercase'
                type='submit'>
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
