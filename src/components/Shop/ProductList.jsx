import React from "react";
import flowerImage from "../../assets/images/shop-14-img.jpg";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const flowerList = [
  {
    id: 1,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 2,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 3,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 4,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 5,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 6,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 7,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 8,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
  {
    id: 9,
    title: "Schefflera",
    price: "259",
    image: flowerImage,
  },
];
const ProductList = () => {
  return (
    <section className='mb-[20vh]'>
      <div className='container max-w-7xl mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-self-center lg:justify-self-auto '>
          {flowerList.map((item) => (
            <div
              key={item.id}
              className='group flex flex-col gap-2 justify-center items-center w-72 rounded font-montserrat'>
              <div className='w-full h-full rounded overflow-hidden'>
                <img
                  src={flowerImage}
                  alt='fImage'
                  className='w-full h-full rounded group-hover:scale-105 transition-all duration-200'
                />
              </div>
              <h5 className='uppercase text-[14px] tracking-wider'>
                Schefflera
              </h5>
              <p className='text-[13px] text-gray-700'>$259</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default ProductList;
