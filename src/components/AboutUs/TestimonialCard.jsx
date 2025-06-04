import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { flowerExpertsData } from "./FlowerExperts";

const TestimonialCard = () => {
  const [api, setApi] = useState(null);
  return (
    <section className='relative h-[400px] flex justify-center items-center overflow-hidden'>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {flowerExpertsData.map((expert) => (
            <CarouselItem key={expert.id} className='w-52'>
              <div className='flex flex-col justify-center items-center gap-4 max-w-xl mx-auto'>
                <div className='h-32 w-32'>
                  <img src={expert.image} alt='' className='h-full w-full' />
                </div>
                <p className='text-center text-lg md:text-xl font-lora tracking-wider text-gray-800 italic max-w-sm md:max-w-full'>
                  Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                  Cras dapibus lingua.
                </p>
                <div className='flex flex-col gap-3 items-center font-montserrat text-gray-800 tracking-wider'>
                  <h3>{expert.name}</h3>
                  <p className='text-gray-600'>{expert.designation}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='absolute inset-0 hidden md:flex justify-between text-gray-400'>
          <button className='cursor-pointer' onClick={() => api.scrollPrev()}>
            <svg
              xmlns:x='http://ns.adobe.com/Extensibility/1.0/'
              xmlns:i='http://ns.adobe.com/AdobeIllustrator/10.0/'
              xmlns:graph='http://ns.adobe.com/Graphs/1.0/'
              xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink'
              x='0px'
              y='0px'
              width='60px'
              height='16.667px'
              viewBox='0 0 75.417 16.667'
              enable-background='new 0 0 75.417 16.667'
              xml:space='preserve'>
              <line
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-miterlimit='10'
                x1='1.681'
                y1='7.817'
                x2='73.257'
                y2='7.817'></line>
              <polyline
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-miterlimit='10'
                points='8.235,1.351 1.681,7.817 8.235,15.316'></polyline>
            </svg>
          </button>
          <button className='cursor-pointer' onClick={() => api.scrollNext()}>
            <svg
              xmlns:x='http://ns.adobe.com/Extensibility/1.0/'
              xmlns:i='http://ns.adobe.com/AdobeIllustrator/10.0/'
              xmlns:graph='http://ns.adobe.com/Graphs/1.0/'
              xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink'
              x='0px'
              y='0px'
              width='60px'
              height='16.667px'
              viewBox='0 0 75.417 16.667'
              enable-background='new 0 0 75.417 16.667'
              xml:space='preserve'>
              <line
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-miterlimit='10'
                x1='1.681'
                y1='7.817'
                x2='73.257'
                y2='7.817'></line>
              <polyline
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-miterlimit='10'
                points='67.235,1.351 73.985,7.817 67.235,15.316'></polyline>
            </svg>
          </button>
        </div>
      </Carousel>
    </section>
  );
};

export default TestimonialCard;
