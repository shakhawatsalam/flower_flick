import { Play, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "../../assets/images/shop-14-img.jpg";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUpdateCartItemMutation } from "@/redux/features/cart/cartApi";

const CartDetails = () => {
  const cart = useSelector((state) => state.cartSlice);
  const [localCart, setLocalCart] = useState(cart.cart);
  const [updateCartItem] = useUpdateCartItemMutation();

  useEffect(() => {
    setLocalCart(cart.cart);
  }, [cart]);

  // Function to calculate total price based on items
  const calculateTotalPrice = (items) => {
    return items.reduce(
      (total, item) => total + item.flower.price * item.quantity,
      0
    );
  };

  const handleUpdateCartItem = async (itemId, quantity) => {
    // Prevent quantity from going below 1
    if (quantity < 1) return;

    const prevLocalCopy = { ...localCart };
    // Optimistically update local state
    const updatedItems = localCart.items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setLocalCart({
      ...localCart,
      items: updatedItems,
      total_price: calculateTotalPrice(updatedItems), // Update total price locally
    });

    try {
      const { id: cartId } = cart.cart;
      const data = { quantity };
      await updateCartItem({ cartId, itemId, data }).unwrap();
    } catch (error) {
      console.log("error updating quantity", error);
      // Revert to previous state on error
      setLocalCart(prevLocalCopy);
    }
  };

  return (
    <section>
      <div className='container mx-auto max-w-7xl mb-[20vh]'>
        <Table className='font-montserrat tracking-wider'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className='w-[350px]'>Quantity</TableHead>
              <TableHead className='text-center'>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localCart?.items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium w-[200px]'>
                  <div className='flex gap-3 justify-start items-center h-full'>
                    <div className='cursor-pointer'>
                      <X size={16} />
                    </div>
                    <div className='h-28 w-28'>
                      <img
                        src={Image}
                        alt='image'
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <h2>{item?.flower?.title}</h2>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{item?.flower?.price}</p>
                </TableCell>
                <TableCell>
                  <div>
                    <div className='h-14 text-gray-400 flex items-center justify-between p-3 border border-gray-300'>
                      <div>
                        <p className='font-montserrat text-[0.8rem] tracking-wider'>
                          Quantity
                        </p>
                      </div>
                      <div className='flex justify-center items-center gap-3 p-0.5 font-montserrat'>
                        <Play
                          size={11}
                          fill='#99a1af'
                          className='rotate-180 cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                          onClick={() =>
                            handleUpdateCartItem(item.id, item.quantity - 1)
                          }
                        />
                        <span>{item?.quantity}</span>
                        <Play
                          size={11}
                          fill='#99a1af'
                          className='cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                          onClick={() =>
                            handleUpdateCartItem(item.id, item.quantity + 1)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='text-center'>
                  $ {(item?.flower?.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className='font-semibold h-24'>
              <TableCell />
              <TableCell />
              <TableCell className='text-end'>Total :</TableCell>
              <TableCell className='text-center'>
                <p>$ {localCart?.total_price?.toFixed(2)}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className='h-12 font-montserrat my-3'>
          <div className='flex justify-end items-center gap-5 h-full font-semibold mr-5'>
            <Button
              size='lg'
              className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-14'>
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartDetails;
