import { Heart, ArrowRight } from "lucide-react";
import promoImageOne from "../../assets/images/promo-imag-01.jpg";
import promoImageTwo from "../../assets/images/promo-imag-02.jpg";
import { motion } from "motion/react";

const PromoBanner = () => {
  return (
    <section className='container max-w-7xl mx-auto mb-16 px-4'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Sale Banner */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='group h-[300px] md:w-[50%] rounded-2xl relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500'>
          <div className='h-full w-full'>
            <img
              src={promoImageOne}
              alt='Wedding Bouquets Sale'
              className='h-full w-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-110'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-r from-[#EAC0EE]/90 via-[#EAC0EE]/70 to-transparent'>
            <div className='h-full flex flex-col justify-center p-10'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}>
                <h3 className='text-6xl text-[#F34F3F] font-lora mb-4 font-bold'>
                  -30% Sale
                </h3>
                <p className='font-montserrat text-gray-800 text-xl tracking-wide mb-6'>
                  Wedding Bouquets
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='bg-[#F34F3F] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#d8200e] transition-colors duration-300'>
                  Shop Now <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='group h-[300px] md:w-[50%] rounded-2xl relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500'>
          <div className='h-full w-full'>
            <img
              src={promoImageTwo}
              alt='Flower Features'
              className='h-full w-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-110'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent'>
            <div className='h-full flex flex-col justify-center p-10'>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className='font-lora tracking-wide flex flex-col gap-6'>
                <motion.li
                  whileHover={{ x: 10 }}
                  className='flex items-center gap-3 text-gray-700 text-lg group/item'>
                  <span className='bg-[#F34F3F]/10 p-2 rounded-full group-hover/item:bg-[#F34F3F] transition-colors duration-300'>
                    <Heart
                      fill='#F34F3F'
                      className='text-[#F34F3F] group-hover/item:text-white transition-colors duration-300'
                    />
                  </span>
                  Best way to say you care
                </motion.li>
                <motion.li
                  whileHover={{ x: 10 }}
                  className='flex items-center gap-3 text-gray-700 text-lg group/item'>
                  <span className='bg-[#F34F3F]/10 p-2 rounded-full group-hover/item:bg-[#F34F3F] transition-colors duration-300'>
                    <Heart
                      fill='#F34F3F'
                      className='text-[#F34F3F] group-hover/item:text-white transition-colors duration-300'
                    />
                  </span>
                  Unique arrangements
                </motion.li>
                <motion.li
                  whileHover={{ x: 10 }}
                  className='flex items-center gap-3 text-gray-700 text-lg group/item'>
                  <span className='bg-[#F34F3F]/10 p-2 rounded-full group-hover/item:bg-[#F34F3F] transition-colors duration-300'>
                    <Heart
                      fill='#F34F3F'
                      className='text-[#F34F3F] group-hover/item:text-white transition-colors duration-300'
                    />
                  </span>
                  Hand picked just for you
                </motion.li>
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
