import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const PaymentFailed = () => {
  return (
    <div className='h-[70vh] flex justify-center items-center'>
      <div className='font-playfair font-semibold text-2xl tracking-widest max-w-md text-center'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <p className='text-red-600'>Payment Failed ❌</p>
          <p className='text-sm text-gray-600 font-montserrat font-normal'>
            Unfortunately, your payment could not be processed. Please try again
            or contact support.
          </p>
          <div className='flex gap-3 flex-col w-full mt-4'>
            {/* <Link to='/cart' className='w-full'>
              <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer font-montserrat w-full'>
                Back to Cart
              </Button>
            </Link> */}
            <Link to='/' className='w-full'>
              <Button
                variant='outline'
                className='cursor-pointer font-montserrat w-full border-[#F34F3F] text-[#F34F3F] hover:bg-red-50'>
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
