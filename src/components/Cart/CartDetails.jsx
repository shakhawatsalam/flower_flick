import { Play, X } from "lucide-react";
import React from "react";
import Image from "../../assets/images/shop-14-img.jpg";
import { Button } from "../ui/button";

const CartDetails = () => {
  return (
    <section>
      <div className='container mx-auto max-w-7xl mb-[20vh]'>
        <div className='py-5 font-montserrat tracking-wider border-b border-gray-300'>
          <div className='flex justify-between'>
            <div>
              <h1>Product</h1>
            </div>
            <div className='flex gap-16'>
              <h1>Price</h1>
              <h1>Quantity</h1>
            </div>
            <div>
              <h1>Subtotal</h1>
            </div>
          </div>
        </div>

        <div className='font-montserrat my-3'>
          <div className='flex items-center justify-between p-3 border-b  border-gray-300'>
            <div className='flex gap-3 justify-center items-center h-full'>
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
              <div>
                <h2>Schefflera</h2>
              </div>
            </div>
            <div className='flex justify-between items-center  gap-12'>
              <h2>$259</h2>
              <div>
                <div className='w-80 h-14 text-gray-400 flex items-center justify-between p-3 border border-gray-300'>
                  <div>
                    <p className='font-montserrat text-[0.8rem] tracking-wider'>
                      Quantity
                    </p>
                  </div>
                  <div className='flex justify-center items-center gap-3 p-0.5  font-montserrat'>
                    <Play
                      size={11}
                      fill='#99a1af'
                      className='rotate-180 cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                    />
                    <span>1</span>
                    <Play
                      size={11}
                      fill='#99a1af'
                      className='cursor-pointer hover:fill-[#F34F3F] hover:text-[#F34F3F] transition-colors duration-200'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>$225</h2>
            </div>
          </div>
        </div>

        <div className='h-12 font-montserrat'>
          <div className='flex justify-end items-center gap-5 p-3 h-full  font-semibold'>
            <div className=''>
              <p>Total:</p>
            </div>
            <div>
              <p>$776</p>
            </div>
          </div>
        </div>
        <div className='h-12 font-montserrat my-3'>
          <div className='flex justify-end items-center gap-5 h-full font-semibold'>
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
