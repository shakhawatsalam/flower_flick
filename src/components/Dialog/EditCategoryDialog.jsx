import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
});

const EditCategoryDialog = ({ category, setOpen }) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateCategory({ id: category.id, data }).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  return (
    <DialogContent className='sm:max-w-[425px] font-montserrat'>
      <DialogHeader>
        <DialogTitle className='text-center'>Edit Category</DialogTitle>
        <DialogDescription className='text-center text-sm text-gray-500'>
          Update category information
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input {...field} className='h-12' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea {...field} className='h-24' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className='flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='ghost' className='uppercase'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              className='bg-[#F34F3F] hover:bg-[#d8200e] w-full uppercase cursor-pointer'
              disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Category"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditCategoryDialog;
