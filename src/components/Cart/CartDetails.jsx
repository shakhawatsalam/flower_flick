import { Play, X } from "lucide-react";

import Image from "../../assets/images/shop-14-img.jpg";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/cart/cartApi";
import { Skeleton } from "../ui/skeleton";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import {
  deleteItem,
  removeCart,
  updateItemQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const CartDetails = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { cart } = useSelector((state) => state.cartSlice);
  const debounce = useDebouncedCallback(1000);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const dispatch = useDispatch();
  // Handle Update Quantity
  const handleUpdateCartItem = async (itemId, quantity) => {
    // Prevent quantity from going below 1
    if (quantity < 1) return;
    dispatch(updateItemQuantity({ itemId, quantity }));
    const { id: cartId } = cart;
    const data = { quantity };
    debounce(itemId, async () => {
      try {
        await updateCartItem({ cartId, itemId, data }).unwrap();
      } catch (error) {
        console.error("error updating quantity", error);
      }
    });
  };
  // Handle Delete Item's
  const handleDeleteCartItem = async (itemId) => {
    dispatch(deleteItem(itemId));

    try {
      const { id: cartId } = cart;

      await deleteCartItem({ cartId, itemId });
    } catch (error) {
      console.log("error deleting quantity", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const { id: cartId } = cart;
      const createOrderResponse = await createOrder({
        cart_id: cartId,
      }).unwrap();
      if (createOrderResponse) {
        dispatch(removeCart());
      }
    } catch (error) {
      console.log("Error Creating Order", error);
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
            {/* {cart?.items?.length === 0 && (
              <TableRow className='font-semibold h-24'>
                <TableCell colSpan={4} className='text-center'>
                  There is No Items in your cart
                </TableCell>
              </TableRow>
            )} */}
            {cart && cart?.items?.length ? (
              cart?.items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='font-medium w-[200px]'>
                    <div className='flex gap-3 justify-start items-center h-full'>
                      <div className='cursor-pointer'>
                        <X
                          disabled={isLoading}
                          size={16}
                          onClick={() => handleDeleteCartItem(item.id)}
                        />
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
                            disabled={isLoading}
                            className='rotate-180 cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                            onClick={() =>
                              handleUpdateCartItem(item.id, item.quantity - 1)
                            }
                          />
                          <span>{item?.quantity}</span>
                          <Play
                            size={11}
                            fill='#99a1af'
                            disabled={isLoading}
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
              ))
            ) : (
              <TableRow className='font-semibold h-24'>
                <TableCell colSpan={4} className='text-center'>
                  There is No Items in your cart
                </TableCell>
              </TableRow>
            )}
            {/* {Object.keys(cart).length === 0
              ? [...Array(4)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className='font-medium w-[200px]'>
                      <div className='flex gap-3 justify-start items-center h-full'>
                        <div className='cursor-pointer'>
                          <Skeleton className='h-5 w-5' />
                        </div>
                        <div className='h-28 w-24'>
                          <Skeleton className='h-full w-full' />
                        </div>
                        <Skeleton className='h-5 w-32' />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-5 w-24' />
                    </TableCell>
                    <TableCell>
                      <div className='h-14 text-gray-400 flex items-center justify-between '>
                        <Skeleton className='h-full w-full' />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-5 w-24 mx-auto' />
                    </TableCell>
                  </TableRow>
                ))
              : cart?.items?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium w-[200px]'>
                      <div className='flex gap-3 justify-start items-center h-full'>
                        <div className='cursor-pointer'>
                          <X
                            size={16}
                            onClick={() => handleDeleteCartItem(item.id)}
                          />
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
                ))} */}
            <TableRow className='font-semibold h-24'>
              <TableCell />
              <TableCell />
              <TableCell className='text-end'>Total Price :</TableCell>
              <TableCell className='text-center'>
                <p>
                  $ {cart?.total_price ? cart?.total_price?.toFixed(2) : "0"}
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className='h-12 font-montserrat my-3'>
          <div className='flex justify-end items-center gap-5 h-full font-semibold mr-5'>
            {cart && cart?.items?.length && (
              <Button
                size='lg'
                disabled={isLoading}
                onClick={handleCreateOrder}
                className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-14'>
                {isLoading ? "Processing..." : "Proceed to checkout"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartDetails;
