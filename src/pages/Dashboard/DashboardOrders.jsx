import { Button } from "@/components/ui/button";
import React from "react";

const DashboardOrders = () => {
  return (
    <section className='h-48 mb-16 p-10 border-b border-dashed shadow-2xs'>
      <div className='flex justify-between items-center p-5 lg:p-0'>
        <div>
          <h1 className='font-montserrat text-4xl mb-5'>Order List</h1>
          <p className='font-lora text-gray-600 italic text-[18px]'>
            Where flowers are our inspiration
          </p>
        </div>
        <div>
          <Button
            px-4
            py-2
            className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer uppercase'>
            Update Order
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DashboardOrders;
