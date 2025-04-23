import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import imageOne from "../../assets/images/image-01.jpg";
import imageTwo from "../../assets/images/image-02.jpg";
import imageThree from "../../assets/images/image-03.jpg";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { motion } from "motion/react";
import { useState } from "react";
const imageCarousel = [
  {
    src: imageOne,
    alt: "image ",
  },
  {
    src: imageTwo,
    alt: "image ",
  },
  {
    src: imageThree,
    alt: "image",
  },
];
const HeroCarousel = () => {
  const [api, setApi] = useState(null);
  return (
    <div className='relative w-full mb-14'>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          duration: 30,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            // playOnInit: true,
            stopOnInteraction: false,
          }),
          Fade(),
        ]}>
        <CarouselContent className='h-[75vh]'>
          {imageCarousel.map((image, idx) => (
            <CarouselItem key={idx} className='relative h-full'>
              <div className='h-full w-full'>
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.5 }}
                  viewport={{ amount: 0.1 }}
                  // viewport={{ once: true }}
                  transition={{ duration: 5, ease: "linear" }}
                  className='h-full w-full object-top-left rounded-none'
                />
              </div>
              {/* Optional overlay content */}
              <div className='absolute inset-0 bg-gradient-to-r from-[#F3F3F3] from-40% to-transparent to-100% flex items-center justify-center' />
              <div className='absolute container max-w-7xl mx-auto inset-0 flex flex-col items-start justify-center p-5 lg:p-5'>
                <div className='max-w-[350px] md:max-w-lg'>
                  <h2 className='text-black text-4xl md:text-6xl tracking-wide font-playfair'>
                    Send <span className='text-[#F34F3F]'>flowers</span> like{" "}
                    <br />
                    you mean it.
                  </h2>
                  <p className='mt-10 text-gray-700 font-lora md:text-lg text-[14px] font-thin'>
                    Where flowera are our inspiratin to create lasting memories.
                    Whatever the occasion, our flowers will make it special
                    cursus a sit amet mauris.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='absolute inset-0 hidden lg:flex justify-between  p-5 '>
          <button className='cursor-pointer' onClick={() => api.scrollPrev()}>
            <svg
              className='text-gray-400 hover:text-gray-700 transition-all duration-200 '
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
              className='text-gray-400 hover:text-gray-700 transition-all duration-200'
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
    </div>
  );
};

export default HeroCarousel;
