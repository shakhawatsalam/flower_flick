import { Button } from "@/components/ui/button";
import React from "react";
import ConfettiExplosion from "react-confetti-blast";

import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className='h-[70vh] flex justify-center items-center'>
      <div className='font-playfair font-semibold text-2xl tracking-widest max-w-md text-center'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <p>Congrats, your payment is successfully 👋👋👋</p>
          <Link to='/'>
            <Button className='bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer font-montserrat'>
              Go to Home
            </Button>
          </Link>
          <ConfettiExplosion duration={4000} width={3000} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
