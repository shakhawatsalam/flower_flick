import { useUserActivationMutation } from "@/redux/features/auth/authApi";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ConfettiExplosion from "react-confetti-explosion";
const ActivateAccountPage = () => {
  const { uid, token } = useParams();
  const [userActivation, { status }] = useUserActivationMutation();
  const navigate = useNavigate();
  console.log(status);
  useEffect(() => {
    userActivation({ uid, token });
  }, [token, uid, userActivation]);

  useEffect(() => {
    if (status === "fulfilled") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer); // clean up
    }
  }, [status, navigate]);
  return (
    <div className='h-[70vh] flex justify-center items-center'>
      <div className='font-playfair font-semibold text-2xl tracking-widest max-w-md text-center'>
        {status === "pending" ? (
          <p>Loading...</p>
        ) : status === "fulfilled" ? (
          <div className='flex flex-col justify-center items-center'>
            <p>Congrats, your account is activated successfully 👋👋👋</p>
            <ConfettiExplosion duration={4000} width={3000} />
          </div>
        ) : (
          <p>Sorry, account is not activated. Try again after some time.</p>
        )}
      </div>
    </div>
  );
};

export default ActivateAccountPage;
