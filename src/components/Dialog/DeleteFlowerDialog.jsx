import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useDeleteFlowerMutation } from "@/redux/features/product/productApi";
import { Trash2 } from "lucide-react";

const DeleteFlowerDialog = ({ flower }) => {
  const [deleteFlower, { isLoading }] = useDeleteFlowerMutation();
  const handleDelete = async () => {
    try {
      await deleteFlower(flower.id).unwrap();
    } catch (error) {
      console.log("Error While Deleting The Flower", error);
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
          Are you sure you want to delete this flower? This action cannot be
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

export default DeleteFlowerDialog;
