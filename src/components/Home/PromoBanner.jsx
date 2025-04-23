import { Heart } from "lucide-react";
import promoImageOne from "../../assets/images/promo-imag-01.jpg";
import promoImageTwo from "../../assets/images/promo-imag-02.jpg";
const PromoBanner = () => {
  return (
    <section className='container max-w-7xl mx-auto mb-16'>
      <div className='flex flex-col md:flex-row gap-5 p-3'>
        <div className='group h-[200px] md:w-[50%] rounded-xl relative overflow-hidden'>
          <div className='h-full w-full'>
            <img
              src={promoImageOne}
              alt=''
              className='h-full w-full object-cover rounded-xl transition-all duration-300  group-hover:scale-110'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-r from-[#EAC0EE] from-20% to-transparent to-100%'>
            <div className='h-full flex flex-col justify-center p-10'>
              <h3 className='text-5xl text-[#F34F3F] font-lora mb-4'>
                -30% Sale
              </h3>
              <p className='font-montserrat text-gray-700 tracking-wide'>
                Wedding Bouquets
              </p>
            </div>
          </div>
        </div>
        <div className='group h-[200px] md:w-[50%] rounded-xl relative overflow-hidden'>
          <div className='h-full w-full'>
            <img
              src={promoImageTwo}
              alt=''
              className='h-full w-full object-cover rounded-xl transition-all duration-300  group-hover:scale-110'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-r from-[#F3F3F3] from-20% to-transparent to-100%'>
            <div className='h-full flex flex-col justify-center p-10'>
              <ul className='font-lora  tracking-wide flex flex-col gap-5'>
                <li className='flex items-center gap-2 text-gray-500'>
                  <span>
                    <Heart fill='#F34F3F' className='text-[#F34F3F]' />
                  </span>
                  Best way to say you care.
                </li>
                <li className='flex items-center gap-2 text-gray-500'>
                  <span>
                    <Heart fill='#F34F3F' className='text-[#F34F3F]' />
                  </span>
                  Unique arrangements.
                </li>
                <li className='flex items-center gap-2 text-gray-500'>
                  <span>
                    <Heart fill='#F34F3F' className='text-[#F34F3F]' />
                  </span>
                  Hand picked just for you.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
