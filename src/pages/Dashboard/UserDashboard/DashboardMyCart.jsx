import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  useCreateCartMutation,
  useDeleteCartItemMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
} from "@/redux/features/cart/cartApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import {
  addCart,
  deleteItem,
  removeCart,
  updateItemQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useEffect, useState } from "react";

const DashboardMyCart = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: cartData, isFetching } = useGetCartQuery();
  const cart = cartData ? cartData[0] : {};
  const [createCart, { data: createdCart, isSuccess }] =
    useCreateCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [localQuantities, setLocalQuantities] = useState({});
  const dispatch = useDispatch();

  // Effect to handle new cart creation
  useEffect(() => {
    if (isSuccess && cartData) {
      dispatch(addCart(createdCart));
    }
  }, [isSuccess, createdCart, dispatch, cartData]);
  // Update code for update quantity api call and local quantity update for better ui experience
  const debouncedUpdateCartItem = useDebouncedCallback(
    async (itemId, quantity) => {
      try {
        const { id: cartId } = cart;
        await updateCartItem({ cartId, itemId, data: { quantity } }).unwrap();
      } catch (error) {
        console.error("error updating quantity", error);
      }
    },
    1000
  );
  // handle update quantity change and calling the debouncedUpdateCartItem(itemId, newQuantity)
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    // Update local UI state
    setLocalQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));

    // Trigger debounced API update
    debouncedUpdateCartItem(itemId, newQuantity);
  };
  // // Handle Update Quantity
  // const handleUpdateCartItem = async (itemId, quantity) => {
  //   if (quantity < 1) return;
  //   dispatch(updateItemQuantity({ itemId, quantity }));
  //   const { id: cartId } = cart;
  //   const data = { quantity };
  //   debounce(itemId, async () => {
  //     try {
  //       await updateCartItem({ cartId, itemId, data }).unwrap();
  //     } catch (error) {
  //       console.error("error updating quantity", error);
  //     }
  //   });
  // };

  // Handle Delete Item's
  const handleDeleteCartItem = async (itemId) => {
    // dispatch(deleteItem(itemId));
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
        // First remove the current cart
        dispatch(removeCart());
        // Then create a new cart
        await createCart().unwrap();
      }
    } catch (error) {
      console.log("Error Creating Order", error);
    }
  };

  return (
    <section className='p-4 md:p-10'>
      <div className='mb-8'>
        <h1 className='font-playfair text-3xl md:text-4xl mb-4'>My Cart</h1>
        <p className='font-lora text-gray-600 italic text-[16px] md:text-[18px]'>
          Review and manage your cart items
        </p>
      </div>

      <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
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
                          className='text-gray-500 hover:text-[#F34F3F] transition-colors'
                        />
                      </div>
                      <div className='h-28 w-28'>
                        <img
                          src={item?.flower?.images[0]?.image}
                          alt={item?.flower?.title}
                          className='h-full w-full object-contain'
                        />
                      </div>
                      <h2 className='text-sm md:text-base'>
                        {item?.flower?.title}
                      </h2>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>${item?.flower?.price}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className='h-14 text-gray-400 flex items-center justify-between p-3 border border-gray-300 rounded-md'>
                        <div>
                          <p className='font-montserrat text-[0.8rem] tracking-wider'>
                            Quantity
                          </p>
                        </div>
                        <div className='flex justify-center items-center gap-3 p-0.5 font-montserrat'>
                          <Play
                            size={11}
                            fill='#99a1af'
                            disabled={isFetching}
                            className={`rotate-180 cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200`}
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                (localQuantities[item.id] ?? item.quantity) - 1
                              )
                            }
                          />
                          <span>
                            {localQuantities[item.id] ?? item.quantity}
                          </span>
                          <Play
                            size={11}
                            fill='#99a1af'
                            disabled={isFetching}
                            className='cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                (localQuantities[item.id] ?? item.quantity) + 1
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>
                    ${(item?.flower?.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className='font-semibold h-24'>
                <TableCell colSpan={4} className='text-center'>
                  There are no items in your cart
                </TableCell>
              </TableRow>
            )}
            <TableRow className='font-semibold h-24'>
              <TableCell />
              <TableCell />
              <TableCell className='text-end'>Total Price:</TableCell>
              <TableCell className='text-center'>
                <p>
                  ${cart?.total_price ? cart?.total_price?.toFixed(2) : "0"}
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {cart && cart?.items?.length > 0 && (
          <div className='p-4 border-t bg-gray-50'>
            <div className='flex justify-end'>
              <Button
                size='lg'
                disabled={isLoading}
                onClick={handleCreateOrder}
                className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-12 w-full md:w-auto'>
                {isLoading ? "Processing..." : "Proceed to checkout"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardMyCart;
