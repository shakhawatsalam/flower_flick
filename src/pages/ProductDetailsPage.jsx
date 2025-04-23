import { Button } from "@/components/ui/button";
import { Minus, Play, Plus } from "lucide-react";
import React, { useState } from "react";

const images = [
  "https://i.ibb.co.com/GTGBw03/image-323.png",
  "https://i.ibb.co.com/thxkk1x/image-320.png",
  "https://i.ibb.co.com/MckV93r/image-320.png",
  "https://i.ibb.co.com/ZGWRGDT/image-320.png",
];

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section>
      <div className='container max-w-7xl mx-auto p-3'>
        <div className='mx-auto md:px-8 md:py-12'>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-20'>
            {/* Left side - Image gallery */}
            <div className='flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row'>
              {/* Thumbnails */}
              <div className='w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2'>
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-36 md:w-25 h-[70px] md:h-25 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-[#F34F3F]"
                        : "border-transparent"
                    }`}>
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className='object-cover'
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className='w-full md:w-[80%] bg-gray-100 rounded-sm h-[280px] md:h-[500px] relative flex items-center justify-center'>
                <img
                  src={images[selectedImage]}
                  alt='Product main image'
                  className='object-cover w-[200px] md:w-[300px] rounded-lg '
                />
              </div>
            </div>

            {/* Right side - Product details */}
            <div className='flex flex-col gap-6'>
              <div>
                <h1 className='text-4xl text-gray-800 font-playfair'>
                  Apple iPhone 14 Pro Max
                </h1>
                <div className='flex items-center gap-2 mt-2 md:mt-5'>
                  <span className='text-md text-gray-600 font-montserrat tracking-wider'>
                    $1399
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
              <div className='flex'>
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
                <Button className='h-14 rounded-l-none bg-black hover:bg-black/90 cursor-pointer uppercase tracking-widest'>
                  Add to Card
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
