import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";

const categorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
});

const CreateCategoryDialog = ({ setOpen }) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createCategory(data).unwrap();
      setOpen(false);
      form.reset();
    } catch (error) {
      console.log("Error While Creating Category", error);
    }
  };

  return (
    <DialogContent className='sm:max-w-[425px] font-montserrat'>
      <DialogHeader>
        <DialogTitle className='text-center'>Create Category</DialogTitle>
        <DialogDescription className='text-center text-sm text-gray-500'>
          Add a name and description for the new category.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 py-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='h-14'
                    placeholder='Category name'
                  />
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
                  <Textarea
                    {...field}
                    className='h-24 resize-none'
                    placeholder='Category description'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              disabled={isLoading}
              type='submit'
              className='bg-[#F34F3F] hover:bg-[#d8200e] h-12 w-full uppercase cursor-pointer'>
              Save Category
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateCategoryDialog;
