import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "motion/react";
import { useDropzone } from "react-dropzone";
// import {
//   useUpdateFlowerMutation,
//   useUploadFlowerImageMutation,
// } from "@/redux/features/product/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import {
  useDeleteFlowerImageMutation,
  useGetFlowerImageQuery,
  useUpdateFlowerMutation,
  useUploadFlowerImageMutation,
} from "@/redux/features/product/productApi";
import { DialogClose } from "@radix-ui/react-dialog";
import { MoveLeft } from "lucide-react";

const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
  //   category: z.string().nonempty("Category is required"),
});

const EditFlowerDialog = ({ flower, setOpen }) => {
  const [flowerId, setFlowerId] = useState(flower?.id);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const { data: categories } = useGetAllCategoriesQuery();
  const [updateFlower] = useUpdateFlowerMutation();
  const [uploadFlowerImage, { isLoading: isImageUploading }] =
    useUploadFlowerImageMutation();
  const { data: flowerImages, refetch } = useGetFlowerImageQuery({ flowerId });
  const [deleteFlowerImage] = useDeleteFlowerImageMutation();

  const [goToUploadStep, setGoToUploadStep] = useState(false);
  useEffect(() => {
    setExistingImages(flowerImages);
  }, [flowerImages]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: flower?.title,
      description: flower?.description,
      price: flower?.price,
      quantity: flower?.quantity,
      category: flower?.category,
    },
  });

  const onSubmit = async (data) => {
    try {
      const updated = await updateFlower({ id: flowerId, data });
      if (updated && flowerImages) {
        setGoToUploadStep(true);
      }
    } catch (err) {
      console.error("Failed to update flower", err);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });
  console.log(existingImages);
  const uploadImages = async () => {
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        await uploadFlowerImage({ flowerId, data: formData }).unwrap();
        refetch();
      }
      alert("Images updated successfully!");
      setOpen(false);
      refetch();
      setGoToUploadStep(false);
    } catch (err) {
      console.error("Image update failed", err);
    }
  };
  // Delete Image
  const handleRemoveExistingImage = async (id) => {
    try {
      await deleteFlowerImage({ flowerId, id }).unwrap();
      refetch();
    } catch (error) {
      console.log("Error Deleting Image", error);
    }
  };
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const slideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <>
      {goToUploadStep ? (
        <DialogContent className='sm:max-w-[425px] font-montserrat'>
          <DialogHeader>
            <MoveLeft
              onClick={() => setGoToUploadStep(false)}
              className='cursor-pointer'
            />
            <DialogTitle className='text-center'>Update Images</DialogTitle>
            <DialogDescription className='text-center text-sm text-gray-500'>
              Add or remove images below
            </DialogDescription>
          </DialogHeader>
          <AnimatePresence mode='wait'>
            <div className='overflow-hidden'>
              <motion.div
                variants={slideVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: "spring", duration: 0.5, stiffness: 100 }}
                className='space-y-4'>
                <div
                  {...getRootProps()}
                  className='border-2 border-dashed border-gray-300 p-6 rounded-md cursor-pointer text-center bg-white'>
                  <input {...getInputProps()} disabled={isImageUploading} />
                  {isDragActive ? (
                    <p className='text-gray-500'>Drop the images here...</p>
                  ) : (
                    <p className='text-gray-500'>
                      Drag & drop or click to select images
                    </p>
                  )}
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  {existingImages?.map((image, idx) => (
                    <div key={`existing-${idx}`} className='relative group'>
                      <img
                        src={image?.image} // or whatever field contains the image URL
                        alt={`existing-${idx}`}
                        className='w-full h-28 object-cover rounded'
                      />
                      <button
                        onClick={() => handleRemoveExistingImage(image.id)}
                        className='absolute top-1 right-1 bg-[#F34F3F] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer'>
                        ✕
                      </button>
                    </div>
                  ))}
                  {images?.map((file, idx) => (
                    <div key={idx} className='relative group'>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`uploaded-${idx}`}
                        className='w-full h-28 object-cover rounded'
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className='absolute top-1 right-1 bg-[#F34F3F] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer'>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={uploadImages}
                  disabled={isImageUploading || images.length === 0}
                  className='bg-[#F34F3F] hover:bg-[#d8200e] w-full h-12 uppercase cursor-pointer'>
                  {isImageUploading ? "Uploading..." : "Update Images"}
                </Button>
              </motion.div>
            </div>
          </AnimatePresence>
        </DialogContent>
      ) : (
        <DialogContent className='sm:max-w-[425px] font-montserrat'>
          <DialogHeader>
            <DialogTitle className='text-center'>Edit Flower</DialogTitle>
            <DialogDescription className='text-center text-sm text-gray-500'>
              Update flower information
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
                      <Input {...field} className='h-14' />
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
                      <Textarea {...field} className='h-16' />
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
                        {...field}
                        className='h-14'
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
                        {...field}
                        className='h-14'
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
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger className='h-16 w-full'>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem value={category.id} key={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className='bg-[#F34F3F] hover:bg-[#d8200e] w-full h-12 uppercase cursor-pointer'
                type='submit'>
                Next
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </>
  );
};

export default EditFlowerDialog;
