import testimonialImage from "../../assets/images/h1-img-3.png";

const TestimonialCard = () => {
  return (
    <section className='flex flex-col items-center gap-4 mb-14'>
      <div>
        <img src={testimonialImage} alt='TestimonialCard Image' />
      </div>
      <h4 className='font-lora text-md md:text-2xl italic text-gray-700 text-center max-w-md md:max-w-4xl'>
        “Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean masa.”
      </h4>
    </section>
  );
};

export default TestimonialCard;
