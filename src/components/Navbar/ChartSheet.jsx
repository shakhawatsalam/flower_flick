import { SheetContent } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
} from "@/redux/features/cart/cartApi";
import { deleteItem } from "@/redux/features/cart/cartSlice";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useState } from "react";

const CartSheet = () => {
  const { data: cartData, isFetching } = useGetCartQuery();
  const cart = cartData ? cartData[0] : {};
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [localQuantities, setLocalQuantities] = useState({});

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

  //   const { id: cartId } = cart;
  //   const data = { quantity };

  //   try {
  //     await updateCartItem({ cartId, itemId, data }).unwrap();
  //   } catch (error) {
  //     console.error("error updating quantity", error);
  //   }
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
  return (
    <SheetContent className='transition-all duration-300 font-montserrat w-[400px]'>
      <div className='flex justify-center font-semibold text-white bg-[#F34F3F] mt-16 p-3'>
        <p>My Cart ({cart?.items?.length ? cart?.items?.length : 0})</p>
      </div>

      <div className='bg-white h-full p-4 space-y-4'>
        <div className='max-h-[60vh] overflow-auto'>
          {cart?.items?.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 border p-3 rounded-md shadow-sm'>
              <img
                src={item?.flower?.images[0]?.image}
                alt=''
                className='w-20 h-20 object-cover rounded-md'
              />

              <div className='flex flex-col justify-between flex-1'>
                <h4 className='font-semibold'>{item?.flower?.title}</h4>
                <p className='text-sm text-gray-600'>
                  $ {item?.flower?.price} each
                </p>

                <div className='flex items-center mt-2 gap-3'>
                  <button
                    className='px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md'
                    disabled={isFetching}
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        (localQuantities[item.id] ?? item.quantity) - 1
                      )
                    }>
                    -
                  </button>
                  <span className='px-3'>
                    {localQuantities[item.id] ?? item.quantity}
                  </span>

                  <button
                    className={`px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md ${
                      isFetching && "bg-gray-300"
                    }`}
                    disabled={isFetching}
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        (localQuantities[item.id] ?? item.quantity) + 1
                      )
                    }>
                    +
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-5 justify-between items-end h-full flex-1'>
                <div className='cursor-pointer'>
                  <X size={16} onClick={() => handleDeleteCartItem(item.id)} />
                </div>
                <div>${(item?.flower?.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className='flex justify-between text-lg font-semibold border-t pt-4'>
          <p>Subtotal</p>
          <p>${cart?.total_price?.toFixed(2)}</p>
        </div>
        <div>
          {cart?.items?.length !== 0 && (
            <Link to='/dashboard/my-cart'>
              <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer h-12 w-full uppercase'>
                View Cart
              </Button>
            </Link>
          )}
        </div>
      </div>
    </SheetContent>
  );
};

export default CartSheet;
