import { useState } from "react";
import { AlignJustify, ShoppingCart, X } from "lucide-react";
import { Link, NavLink } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import ChartSheet from "./ChartSheet";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

const Navbar = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='relative z-50 shadow-md'>
      <div className='container max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-32  px-4 lg:px-0'>
        {/* Logo */}
        <h1 className='text-3xl font-playfair uppercase tracking-wider'>
          <Link to='/'>
            <span className='text-[#F34F3F]'>Flower</span> Flick
          </Link>
        </h1>

        {/* Inline nav links (lg and up) */}
        <div className='hidden lg:flex lg:justify-center lg:items-center space-x-8 font-montserrat'>
          {navItems.map((item) => (
            <>
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#F34F3F] border-b-2 border-[#F34F3F] pb-1"
                    : "text-gray-700 hover:text-[#F34F3F] transition"
                }>
                {item.name}
              </NavLink>
            </>
          ))}
          {user ? (
            <div className='flex justify-center items-center gap-5'>
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <div className='relative cursor-pointer'>
                      <ShoppingCart size={25} className='text-gray-700' />
                      <span className='absolute -top-2 -right-2 bg-[#F34F3F] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full p-2'>
                        {cart ? cart?.items?.length : 0}
                      </span>
                    </div>
                  </SheetTrigger>
                  <ChartSheet />
                </Sheet>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='font-montserrat'>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to='/dashboard'>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to='/orders'>My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link to='/login'>
                <Button
                  px-4
                  py-2
                  className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                  Log In
                </Button>
              </Link>
              <Link to='/signup'>
                <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger / Close button (mobile only) */}
        <button
          className='lg:hidden focus:outline-none'
          onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <X size={20} /> : <AlignJustify size={20} />}
        </button>
      </div>

      {/* Mobile slide‑down menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className='absolute top-16 left-0 w-full overflow-hidden lg:hidden'>
            {/* Background image */}
            {/* <div
              className='absolute inset-0 z-0'
              style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            /> */}
            {/* Overlay tint */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#F3B6C1] from-30% to-transparent to-100% z-0' />

            {/* Links */}
            <div className='relative z-10 flex flex-col items-center py-6 space-y-4 font-montserrat'>
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)} // auto-close on click
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#F34F3F] border-b-2 border-[#F34F3F] pb-1"
                      : "text-white hover:text-[#F34F3F] transition"
                  }>
                  {item.name}
                </NavLink>
              ))}
              <Button
                size='sm'
                className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                Log In
              </Button>
              <Button
                size='sm'
                className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer'>
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
