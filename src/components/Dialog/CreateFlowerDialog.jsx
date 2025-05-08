import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import {
  useCreateFlowerMutation,
  useUploadFlowerImageMutation,
} from "@/redux/features/product/productApi";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required." }),
  description: z.string().nonempty({ message: "Description is required." }),
  price: z
    .number({ invalid_type_error: "Price must be a number." })
    .positive({ message: "Price must be greater than 0." }),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number." })
    .int({ message: "Quantity must be an integer." })
    .positive({ message: "Quantity must be greater than 0." }),
  category: z.string().nonempty({ message: "Category is required." }),
});

const CreateFlowerDialog = ({ setOpen }) => {
  const [images, setImages] = useState([]);
  const { data: categories } = useGetAllCategoriesQuery();
  const [flowerId, setFlowerId] = useState(null);
  const [createFlower, { isLoading }] = useCreateFlowerMutation();
  const [uploadFlowerImage, { isLoading: isImageUploading }] =
    useUploadFlowerImageMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const createFlowerResponse = await createFlower(data).unwrap();
      if (createFlowerResponse) {
        setFlowerId(createFlowerResponse?.id);
      }
    } catch (error) {
      console.log("Error Creating Flower", error);
    }
  };

  // Image Handle
  const onDrop = useCallback((acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });
  // Upload Image
  const uploadImages = async () => {
    if (images.length === 0) return;

    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        await uploadFlowerImage({ flowerId, data: formData }).unwrap();
      }
      toast.success("Images uploaded successfully!");
      setImages([]);
      setFlowerId(null); // Reset to go back to form step
      form.reset(); // ✅ Reset all fields
      setOpen(false);
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed");
    }
  };
  // remove Image
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // For Animation
  const slideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <>
      {flowerId ? (
        <DialogContent className='sm:max-w-[425px] font-montserrat'>
          <DialogHeader>
            <DialogTitle className='text-center'>Upload Images</DialogTitle>
            <DialogDescription className='text-center text-sm text-gray-500'>
              Fill out the flower details to proceed.
            </DialogDescription>
          </DialogHeader>
          <div className='overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.div
                variants={slideVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: "spring", duration: 0.5, stiffness: 100 }}
                className='font-montserrat space-y-4'>
                <div
                  {...getRootProps()}
                  className='border-2 border-dashed border-gray-300 p-6 rounded-md cursor-pointer text-center bg-white'>
                  <input disabled={isImageUploading} {...getInputProps()} />
                  {isDragActive ? (
                    <p className='text-gray-500'>Drop the images here...</p>
                  ) : (
                    <p className='text-gray-500'>
                      Drag & drop images here, or click to select
                    </p>
                  )}
                </div>

                {images.length > 0 && (
                  <div className='grid grid-cols-3 gap-4'>
                    {images.map((file, idx) => (
                      <div key={idx} className='relative group'>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`uploaded-${idx}`}
                          className='w-full h-28 object-cover rounded'
                        />
                        <button
                          disabled={isImageUploading}
                          type='button'
                          onClick={() => removeImage(idx)}
                          className='absolute top-1 right-1 bg-[#F34F3F] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 hover:opacity-100'>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  onClick={uploadImages}
                  disabled={isImageUploading}
                  className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-12 w-full uppercase'>
                  {isImageUploading ? "Uploading..." : "Upload Images"}
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className='sm:max-w-[425px] font-montserrat'>
          <DialogHeader>
            <DialogTitle className='text-center'>Create Flower</DialogTitle>
            <DialogDescription className='text-center text-sm text-gray-500'>
              Fill out the flower details to proceed.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-[#FFFFFF] h-14 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Flower title'
                        {...field}
                        disabled={isLoading}
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
                        className='bg-[#FFFFFF] h-16 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Description'
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        className='bg-[#FFFFFF] h-14 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Price'
                        {...field}
                        disabled={isLoading}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity*</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        className='bg-[#FFFFFF] h-14 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Quantity'
                        {...field}
                        disabled={isLoading}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category*</FormLabel>
                    {categories && (
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}>
                          <SelectTrigger className='h-16 w-full bg-[#FFFFFF] focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0'>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                          <SelectContent className='font-montserrat'>
                            {categories?.map((category) => (
                              <SelectItem value={category.id} key={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-12 w-full uppercase'
                type='submit'>
                {isLoading ? "Creating..." : "Next"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </>
  );
};

export default CreateFlowerDialog;
