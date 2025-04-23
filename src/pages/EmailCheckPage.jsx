import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResendActivationMutation } from "@/redux/features/auth/authApi";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router"; // use react-router-dom for web apps

/**
 * EmailCheckPage
 *
 * Prompt the user to verify their email before logging in.
 * Features:
 * - Semantic, accessible markup
 * - Responsive layout
 * - i18n-ready text
 * - Resend email option with cooldown
 */
const EmailCheckPage = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [resendActivation, { isLoading }] = useResendActivationMutation();
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;
    try {
      await resendActivation({ email }).unwrap();

      setCooldown(60);
    } catch (err) {
      setMessage("Failed to send activation. Please try again.", err);
    }
  };

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <main className='flex flex-col items-center justify-center h-[70vh] px-4'>
      <section className='max-w-md text-center space-y-6'>
        <h1 className='font-playfair text-3xl font-semibold'>
          Please check your email
        </h1>
        <p className='text-base leading-relaxed font-lora'>
          We&apos;ve sent a verification link to your inbox. Click the link to
          activate your account, then log in.
        </p>
        {!initialEmail && (
          <div className='w-full'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'>
              Enter your email
            </label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='mt-1 w-full'
            />
          </div>
        )}
        {message && (
          <p className='text-sm text-center mt-2 font-lora'>{message}</p>
        )}
        <div className='flex flex-col sm:flex-row sm:justify-center gap-4'>
          <Link to='/login'>
            <Button className='px-6 py-2 bg-[#F34F3F] hover:bg-[#d8200e] cursor-pointer w-full'>
              Log In
            </Button>
          </Link>
          <Button
            asChild
            disabled={isLoading || cooldown > 0 || !email}
            className='bg-[#F34F3F] hover:bg-[#d8200e] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F34F3F] px-4 py-2'
            onClick={handleResend}>
            <span>
              {cooldown > 0
                ? `Resend in ${cooldown}s`
                : isLoading
                ? "Sending..."
                : "Resend Email"}
            </span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default EmailCheckPage;
