import ProductDetailsPageSkeleton from "@/components/Skeleton/ProductDetailsPageSkeleton";
import { Button } from "@/components/ui/button";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "@/redux/features/cart/cartApi";
import { addCart } from "@/redux/features/cart/cartSlice";
import { useProductsByIdQuery } from "@/redux/features/product/productApi";
import { Minus, Play, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const images = [
  "https://i.ibb.co.com/GTGBw03/image-323.png",
  "https://i.ibb.co.com/thxkk1x/image-320.png",
  "https://i.ibb.co.com/MckV93r/image-320.png",
  "https://i.ibb.co.com/ZGWRGDT/image-320.png",
];

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data, isFetching } = useProductsByIdQuery({ id });
  const [addToCart, { isSuccess, isLoading, isError, error }] =
    useAddToCartMutation();
  const cart = useSelector((state) => state?.cartSlice?.cart);
  const cartId = cart?.id;
  const { data: updatedCart, refetch } = useGetCartQuery({
    skip: !isSuccess,
  });
  console.log(data?.images[0]?.image);
  const dispatch = useDispatch();
  console.log(cart);
  // Handle quantity increment
  const handleIncrement = () => {
    if (quantity < data?.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Handle quantity decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = async () => {
    if (!cartId) {
      console.error("No cart ID available. Cannot add to cart.");
      toast("Login Required", {
        description: "You must be logged in to add items to the cart.",
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });

      return;
    }
    try {
      const data = {
        flower_id: id,
        quantity,
      };
      console.log({ cartId, data });
      await addToCart({ cartId, data }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // Update Redux store with the updated cart
  useEffect(() => {
    if (isSuccess && updatedCart) {
      refetch();
      dispatch(addCart(updatedCart[0]));
      console.log("Cart updated in Redux:", updatedCart);
    }
    if (isError) {
      console.error("Add to cart error:", error);
    }
  }, [isSuccess, isError, updatedCart, error, dispatch, refetch]);

  if (isFetching) return <ProductDetailsPageSkeleton />;
  return (
    <section>
      <div className='container max-w-7xl mx-auto p-3'>
        <div className='mx-auto md:px-8 md:py-12'>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-20'>
            {/* Left side - Image gallery */}
            <div className='flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row'>
              {/* Thumbnails */}
              <div className='w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2'>
                {data?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-36 md:w-25 h-[70px] md:h-25 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-[#F34F3F]"
                        : "border-transparent"
                    }`}>
                    <img
                      src={image?.image}
                      alt={`Product ${index + 1}`}
                      className='object-cover cursor-pointer'
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className='w-full md:w-[80%] bg-gray-100 rounded-sm h-[280px] md:h-[500px] relative flex items-center justify-center'>
                <img
                  src={data?.images[selectedImage]?.image}
                  alt='Product main image'
                  className='object-cover h-full w-full  rounded-lg '
                />
              </div>
            </div>

            {/* Right side - Product details */}
            <div className='flex flex-col gap-6'>
              <div>
                <h1 className='text-4xl text-gray-800 font-playfair'>
                  {data?.title}
                </h1>
                <div className='flex items-center gap-2 mt-2 md:mt-5'>
                  <span className='text-md text-gray-600 font-montserrat tracking-wider'>
                    ${data?.price}
                  </span>
                </div>
              </div>

              <p className='text-gray-600 font-lora text-[0.9rem] leading-7 tracking-wide'>
                Enhanced capabilities thanks to an enlarged display of 6.7
                inches and work without recharging throughout the day.
                Incredible photos in weak, yes and in bright light using the new
                system with two cameras...
                <button className='text-[#3B9DF8] hover:underline'>
                  more...
                </button>
              </p>
              {/* qutaniity */}
              <div className='flex select-none '>
                <div className='w-80 h-14 text-gray-400 flex items-center justify-between p-3 border border-gray-300'>
                  <div>
                    <p className='font-montserrat text-[0.8rem] tracking-wider'>
                      Quantity
                    </p>
                  </div>
                  <div className='flex justify-center items-center gap-5 p-0.5  font-montserrat'>
                    <Play
                      size={11}
                      fill='#99a1af'
                      onClick={handleDecrement}
                      className='rotate-180 cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                    />
                    <span>{quantity}</span>
                    <Play
                      size={11}
                      fill='#99a1af'
                      onClick={handleIncrement}
                      className='cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                    />
                  </div>
                </div>
                <Button
                  className='h-14 rounded-l-none bg-black hover:bg-black/90 cursor-pointer uppercase tracking-widest'
                  onClick={handleAddToCart}>
                  {isLoading
                    ? "Adding..."
                    : isSuccess
                    ? "Added"
                    : "Add to Cart"}
                </Button>
              </div>
              <div className='font-montserrat text-[14px]'>
                Stock: {data?.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
