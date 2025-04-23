import React from "react";

const Footer = () => (
  <footer className='bg-[#FEFAF3] text-gray-800 py-12 font-montserrat'>
    <div className='container max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
      {/* Customer Service */}
      <div>
        <h4 className='font-medium text-xs uppercase tracking-wider mb-6'>
          Customer Service
        </h4>
        <ul className='space-y-2 text-xs '>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Help & Contact Us
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Returns & Refunds
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Online Stores
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Terms & Conditions
          </li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className='font-medium text-xs  uppercase tracking-wider mb-6'>
          Company
        </h4>
        <ul className='space-y-2 text-xs '>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            About Us
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Blog
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Order Tracking
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            FAQ Page
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Contact Us
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Login
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h4 className='font-medium text-xs  uppercase tracking-wider mb-6'>
          Social Media
        </h4>
        <ul className='space-y-2 text-xs  '>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Twitter
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Instagram
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Tumblr
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Pinterest
          </li>
        </ul>
      </div>

      {/* Archive & Others */}
      <div>
        <h4 className='font-medium text-xs  uppercase tracking-wider mb-6'>
          Archive
        </h4>
        <ul className='space-y-2 text-xs '>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Designer Shoes
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Gallery
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Pricing
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Feature Index
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Login
          </li>
          <li className='text-[#8b8b8bs] hover:text-[#F34F3F] cursor-pointer'>
            Help & Support
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className='mt-12 border-t border-dashed border-gray-300 pt-6' />
    <div className='container max-w-7xl mx-auto '>
      <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs '>
        <span>© 2025 Shakhawat Salam, All Rights Reserved</span>
        <div className='mt-4 md:mt-0 flex space-x-6'>
          <a href='#' className='hover:text-gray-600'>
            INSTAGRAM
          </a>
          <a href='#' className='hover:text-gray-600'>
            FACEBOOK
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
