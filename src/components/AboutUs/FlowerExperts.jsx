import crystalBrooksImage from "../../assets/images/h3-team-img-1.png";
import shirleyHarrisImage from "../../assets/images/h3-team-img-2.png";
import beverlyClarkImage from "../../assets/images/h3-team-img-3.png";
import amandaWatkinsImage from "../../assets/images/h3-team-img-4.png";

export const flowerExpertsData = [
  {
    id: 1,
    name: "Crystal Brooks",
    designation: "Florist",
    image: crystalBrooksImage,
  },
  {
    id: 2,
    name: "Shirley Harris",
    designation: "Manager",
    image: shirleyHarrisImage,
  },
  {
    id: 3,
    name: "Beverly Clark",
    designation: "Florist",
    image: beverlyClarkImage,
  },
  {
    id: 4,
    name: "Amanda Watkins",
    designation: "Florist",
    image: amandaWatkinsImage,
  },
];

const FlowerExperts = () => {
  return (
    <section className='bg-[#F7F7F7] lg:h-[650px] py-5 my-16'>
      <div className='h-full flex justify-center items-center flex-col gap-6'>
        <div className='flex flex-col items-center gap-3 max-w-xl'>
          <h2 className='text-4xl font-playfair tracking-widest '>
            Flower Experts
          </h2>
          <p className='font-lora tracking-wider text-center text-gray-500'>
            A perfect blend of creativity, energy, communication, happiness and
            love. Let us arrange a smile for you.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-32 p-7'>
          {flowerExpertsData.map((expert) => (
            <div
              key={expert.id}
              className='group flex flex-col items-center justify-center gap-2 font-montserrat cursor-pointer'>
              <div className='bg-red-300 rounded-full  overflow-hidden'>
                <img
                  src={expert.image}
                  alt={expert.name}
                  className='group-hover:scale-105 transition-all duration-300'
                />
              </div>
              <h5>{expert.name}</h5>
              <p className='text-gray-600'>{expert.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowerExperts;
