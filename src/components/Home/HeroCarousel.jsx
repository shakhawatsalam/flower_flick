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
    title: "Send flowers like you mean it.",
    description:
      "Where flowers are our inspiration to create lasting memories. Whatever the occasion, our flowers will make it special.",
  },
  {
    src: imageTwo,
    alt: "image ",
    title: "Bloom with elegance.",
    description:
      "Discover the perfect arrangement for every moment. Let our flowers speak the language of your heart.",
  },
  {
    src: imageThree,
    alt: "image",
    title: "Nature's finest gifts.",
    description:
      "Experience the beauty of carefully curated floral arrangements that capture life's most precious moments.",
  },
];

const HeroCarousel = () => {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = () => {
    if (api) {
      setCurrentIndex(api.selectedScrollSnap());
    }
  };

  return (
    <div className='relative w-full mb-14 overflow-hidden'>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          duration: 30,
        }}
        onSelect={handleSelect}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
          Fade(),
        ]}>
        <CarouselContent className='h-[85vh]'>
          {imageCarousel.map((image, idx) => (
            <CarouselItem key={idx} className='relative h-full'>
              <div className='h-full w-full'>
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "linear" }}
                  className='h-full w-full object-cover'
                />
              </div>

              {/* Enhanced overlay with gradient */}
              <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent' />

              {/* Content container with animation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='absolute container max-w-7xl mx-auto inset-0 flex flex-col items-start justify-center p-5 lg:p-5'>
                <div className='max-w-[400px] md:max-w-xl p-5 xl:p-0'>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='text-white text-4xl md:text-6xl lg:text-7xl tracking-wide font-playfair leading-tight'>
                    {image.title.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className={word === "flowers" ? "text-[#F34F3F]" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className='mt-8 text-gray-200 font-lora md:text-lg text-base font-light leading-relaxed'>
                    {image.description}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className='mt-10'>
                    <button className='bg-[#F34F3F] hover:bg-[#d8200e] text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer'>
                      Shop Now
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation Buttons */}
        <div className='absolute inset-0 hidden lg:flex justify-between items-center p-5'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-300'
            onClick={() => api.scrollPrev()}>
            <svg
              className='text-white w-8 h-8'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-300'
            onClick={() => api.scrollNext()}>
            <svg
              className='text-white w-8 h-8'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </motion.button>
        </div>

        {/* Slide Indicators */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3'>
          {imageCarousel.map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-[#F34F3F] w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
