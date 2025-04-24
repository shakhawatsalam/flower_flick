import React from "react";

const ProductDetailsPageSkeleton = () => {
  return (
    <section class='animate-pulse'>
      <div class='container max-w-7xl mx-auto p-3'>
        <div class='mx-auto md:px-8 md:py-12'>
          <div class='w-full grid grid-cols-1 md:grid-cols-2 gap-20'>
            <div class='flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row'>
              <div class='w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2'>
                <div class='h-20 bg-gray-200'></div>
                <div class='h-20 bg-gray-200'></div>
                <div class='h-20 bg-gray-200'></div>
                <div class='h-20 bg-gray-200'></div>
              </div>
              <div class='w-full md:w-[80%] bg-gray-100 rounded-sm h-[280px] md:h-[500px] relative flex items-center justify-center'></div>
            </div>
            <div class='flex flex-col gap-6'>
              <div>
                <div class='h-6 bg-gray-200 w-3/4'></div>
                <div class='flex items-center gap-2 mt-2 md:mt-5'>
                  <div class='h-4 bg-gray-200 w-full'></div>
                  <div class='h-4 bg-gray-200 w-full'></div>
                </div>
                <div class='flex items-center gap-2 mt-2 md:mt-5'>
                  <div class='h-4 bg-gray-200 w-full'></div>
                  <div class='h-4 bg-gray-200 w-full'></div>
                </div>
              </div>
              <div class='h-4 bg-gray-200 w-full my-4'></div>
              <div class='flex'>
                <div class='h-14 w-48 bg-gray-200'></div>
                <div class='h-14 ml-2 bg-gray-200 w-24'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPageSkeleton;
