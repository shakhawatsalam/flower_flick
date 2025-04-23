import { Parallax } from "react-parallax";
import newsletterLetterImg from "../../assets/images/nav-bg-img.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewsletterSignup = () => {
  return (
    <Parallax
      blur={5}
      bgImage={newsletterLetterImg}
      bgImageAlt='the cat'
      strength={400}
      className='mb-16'>
      <div className='h-72 md:h-[400px] flex justify-center items-center'>
        <div className='md:w-[550px] w-96 flex'>
          <Input
            className='bg-[#FFFFFF] md:h-16 h-12 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none'
            placeholder='Email address'
          />
          <Button className='bg-[#F34F3F] hover:bg-[#d8200e]z md:h-16 h-12 rounded-l-none uppercase tracking-wider cursor-pointer'>
            Subscribe
          </Button>
        </div>
      </div>
    </Parallax>
  );
};

export default NewsletterSignup;
