import { Parallax } from "react-parallax";
import newsletterLetterImg from "../../assets/images/about-us-page.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AboutUsHero = () => {
  return (
    <Parallax
      blur={3}
      bgImage={newsletterLetterImg}
      bgImageAlt='the cat'
      strength={800}
      className='mb-24'>
      <div className='h-72 md:h-96 flex justify-center items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-5xl font-playfair tracking-widest'>About Us</h1>
          <p className='font-lora text-gray-600 tracking-wider'>
            Where flowers are our inspiration
          </p>
        </div>
      </div>
    </Parallax>
  );
};

export default AboutUsHero;
