import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogClose } from "@radix-ui/react-dialog";

const OrderDetailsDialog = ({ order }) => {
  return (
    <DialogContent className='sm:max-w-2xl font-montserrat'>
      <DialogHeader>
        <DialogTitle className='text-[#F34F3F]'>Order Summary</DialogTitle>
        <DialogDescription className='text-sm'>
          Detailed information for order ID:{" "}
          <span className='font-semibold'>{order.id}</span>
        </DialogDescription>
      </DialogHeader>

      <div className='grid grid-cols-2 gap-4 text-sm my-4'>
        <div>
          <p>
            <span className='font-semibold'>Status:</span> {order.status}
          </p>
          <p>
            <span className='font-semibold'>Created At:</span>{" "}
            {order.created_at}
          </p>
        </div>
        <div>
          <p>
            <span className='font-semibold'>Total Price:</span> $
            {order.total_price.toFixed(2)}
          </p>
          <p>
            <span className='font-semibold'>User ID:</span> {order.user}
          </p>
        </div>
      </div>

      <div className='border rounded-md overflow-hidden mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>
                  {item.flower.title}
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.total_price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogFooter className='mt-4'>
        <DialogClose>
          <Button variant='ghost'>Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default OrderDetailsDialog;
