import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { addUser } from "@/redux/features/user/userSlice";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  phone_number: z.string().min(1, "Required"),
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      address: user?.address || "",
      phone_number: user?.phone_number || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await updateUserProfile(data).unwrap();
      dispatch(addUser(res));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
  };

  return (
    <section className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-4xl mx-auto px-4'>
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          {/* Profile Header */}
          <div className='flex flex-col items-center mb-8'>
            <div className='relative mb-4'>
              <div className='w-32 h-32 rounded-full bg-gradient-to-r from-[#F34F3F] to-[#ff6b6b] flex items-center justify-center text-white text-4xl font-bold'>
                {user?.first_name?.[0] || user?.email?.[0]}
                {user?.last_name?.[0] || ""}
              </div>
              {isEditing && (
                <button className='absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-600'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                  </svg>
                </button>
              )}
            </div>
            <h1 className='text-4xl font-playfair font-bold text-gray-800'>
              My Profile
            </h1>
            <p className='text-gray-500 mt-2'>
              Manage your personal information
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 font-montserrat'>
              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Email Address
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          className='bg-gray-50 h-14 focus-visible:border-[#F34F3F] focus-visible:ring-1 focus-visible:ring-[#F34F3F] transition-all duration-200'
                          placeholder='Enter your email'
                          {...field}
                        />
                      </FormControl>
                    ) : (
                      <p className='text-base text-gray-800 bg-gray-50 p-4 rounded-lg'>
                        {field.value}
                      </p>
                    )}
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              {/* First + Last Name */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='first_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 font-medium'>
                        First Name
                      </FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input
                            className='bg-gray-50 h-14 focus-visible:border-[#F34F3F] focus-visible:ring-1 focus-visible:ring-[#F34F3F] transition-all duration-200'
                            placeholder='Enter first name'
                            {...field}
                          />
                        </FormControl>
                      ) : (
                        <p className='text-base text-gray-800 bg-gray-50 p-4 rounded-lg'>
                          {field.value}
                        </p>
                      )}
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='last_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 font-medium'>
                        Last Name
                      </FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input
                            className='bg-gray-50 h-14 focus-visible:border-[#F34F3F] focus-visible:ring-1 focus-visible:ring-[#F34F3F] transition-all duration-200'
                            placeholder='Enter last name'
                            {...field}
                          />
                        </FormControl>
                      ) : (
                        <p className='text-base text-gray-800 bg-gray-50 p-4 rounded-lg'>
                          {field.value}
                        </p>
                      )}
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address */}
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Address
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          className='bg-gray-50 h-14 focus-visible:border-[#F34F3F] focus-visible:ring-1 focus-visible:ring-[#F34F3F] transition-all duration-200'
                          placeholder='Enter your address'
                          {...field}
                        />
                      </FormControl>
                    ) : (
                      <p className='text-base text-gray-800 bg-gray-50 p-4 rounded-lg'>
                        {field.value}
                      </p>
                    )}
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name='phone_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Phone Number
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          className='bg-gray-50 h-14 focus-visible:border-[#F34F3F] focus-visible:ring-1 focus-visible:ring-[#F34F3F] transition-all duration-200'
                          placeholder='Enter phone number'
                          {...field}
                        />
                      </FormControl>
                    ) : (
                      <p className='text-base text-gray-800 bg-gray-50 p-4 rounded-lg'>
                        {field.value}
                      </p>
                    )}
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className='pt-4'>
                {isEditing ? (
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button
                      type='submit'
                      className='bg-[#F34F3F] hover:bg-[#d8200e] h-12 flex-1 transition-all duration-200 transform hover:scale-[1.02]'>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type='button'
                      onClick={handleCancel}
                      variant='outline'
                      className='h-12 flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200'>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    type='button'
                    onClick={handleEdit}
                    className='bg-[#F34F3F] hover:bg-[#d8200e] h-12 w-full transition-all duration-200 transform hover:scale-[1.02]'>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
