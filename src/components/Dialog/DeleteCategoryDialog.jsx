import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
import { Trash2 } from "lucide-react";

const DeleteCategoryDialog = ({ category }) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      console.log("delete");
      await deleteCategory(category?.id).unwrap();
    } catch (error) {
      console.error("Error while deleting the category", error);
    }
  };

  return (
    <DialogContent className='sm:max-w-[425px] font-montserrat'>
      <DialogHeader>
        <DialogTitle className='flex items-center gap-2 text-[#F34F3F]'>
          Confirm Deletion
          <Trash2 className='w-5 h-5' />
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this category? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className='flex justify-end gap-2'>
        <DialogClose>
          <Button variant='ghost' className='uppercase'>
            No
          </Button>
        </DialogClose>
        <Button
          className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer uppercase'
          onClick={handleDelete}>
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteCategoryDialog;
