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
import { toast } from "sonner";
import { useRef } from "react";

const DeleteFlowerDialog = ({ flower }) => {
  const [deleteFlower, { isLoading }] = useDeleteFlowerMutation();
  const closeDialogRef = useRef(null);

  const handleDelete = async () => {
    try {
      await deleteFlower(flower.id).unwrap();
      toast.success("Flower deleted successfully.");
      closeDialogRef.current?.click();
    } catch (error) {
      console.error("Error While Deleting The Flower", error);
      toast.error("Could not delete the flower. Please try again.");
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
          disabled={isLoading}
          className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer uppercase'
          onClick={handleDelete}>
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </Button>
        <DialogClose ref={closeDialogRef} asChild>
          <button type='button' className='hidden' aria-hidden='true' />
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteFlowerDialog;
