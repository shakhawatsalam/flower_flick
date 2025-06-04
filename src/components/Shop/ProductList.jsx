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
import { Link, useLocation } from "react-router";

const ProductList = ({ flowers, page, setPage, totalPages, isFetching }) => {
  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);
  const handlePageClick = (num) => setPage(num);
  const location = useLocation();

  const renderPageLinks = () =>
    Array.from({ length: totalPages }, (_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          href='#'
          isActive={page === i + 1}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(i + 1);
          }}>
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ));
  return (
    <section className='mb-[20vh]'>
      <div className='container max-w-7xl mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-self-center lg:justify-self-auto '>
          {isFetching
            ? [...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className='group flex flex-col gap-2 justify-center items-center w-72 rounded font-montserrat animate-pulse'>
                  <div className='w-64 h-80 rounded overflow-hidden border'>
                    <div className='w-full h-80 rounded bg-gray-200'></div>{" "}
                    {/* Simulating image */}
                  </div>
                  <div className='uppercase text-[14px] tracking-wider h-5 bg-gray-200 w-2/3 rounded'></div>{" "}
                  {/* Simulating title */}
                  <div className='text-[13px] text-gray-700 h-5 bg-gray-200 w-1/2 rounded'></div>{" "}
                  {/* Simulating price */}
                </div>
              ))
            : flowers?.results?.map((item) => (
                <Link to={`/flower/${item.id}`}>
                  <div
                    key={item.id}
                    className='group flex flex-col gap-2 justify-center items-center w-72 rounded font-montserrat'>
                    <div className='w-full h-full rounded overflow-hidden'>
                      <img
                        src={item?.images[0]?.image}
                        alt='fImage'
                        className='w-full h-full rounded group-hover:scale-105 transition-all duration-200'
                      />
                    </div>
                    <h5 className='uppercase text-[14px] tracking-wider'>
                      {item.title}
                    </h5>
                    <p className='text-[13px] text-gray-700'>${item.price}</p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      <div>
        <div
          className={`mt-10 flex justify-center ${
            location.pathname !== "/shop" && "hidden"
          }`}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrev();
                  }}
                />
              </PaginationItem>

              {renderPageLinks()}

              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
