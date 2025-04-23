import { Heart } from "lucide-react";
import CampaignImage from "../../assets/images/campaign-image.jpg";
const CampaignHighlight = () => {
  return (
    <section className='bg-[#F7F7F7] md:h-[450px] flex items-center justify-center mb-12 py-5'>
      <div className='container max-w-7xl mx-auto p-3'>
        <div className='flex flex-col md:flex-row justify-center items-center h-full gap-4'>
          <div className='relative group h-80 md:w-[50%]  rounded-xl overflow-hidden cursor-pointer'>
            <div className='w-full h-full '>
              <img
                src={CampaignImage}
                alt=''
                className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300 '
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-tl from-[#F0AFE4] from-5% to-transparent to-75%'></div>
          </div>
          <div className='h-80 md:w-[50%] '>
            <div className='flex flex-col justify-center gap-5 p-3 max-w-md'>
              <h2 className='text-3xl tracking-wider font-playfair'>
                Surprise Your <span className='text-[#F34F3F]'>Valentine!</span>{" "}
                Let us arrange a smile.
              </h2>
              <p className='font-lora text-gray-500 tracking-wide'>
                Where flowers are our inspiration to create lasting memories.
                Whatever the occasion...
              </p>
              <ul className='font-lora  tracking-wide flex flex-col gap-5'>
                <li className='flex items-center gap-2 text-gray-500'>
                  <span>
                    <Heart fill='#F34F3F' className='text-[#F34F3F]' />
                  </span>
                  Hand picked just for you.
                </li>
                <li className='flex items-center gap-2 text-gray-500'>
                  <span>
                    <Heart fill='#F34F3F' className='text-[#F34F3F]' />
                  </span>
                  Unique flower arrangements
                </li>
                <li className='flex items-center gap-2 text-gray-500'>
                  <span>
                    <Heart fill='#F34F3F' className='text-[#F34F3F]' />
                  </span>
                  Best way to say you care.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignHighlight;
