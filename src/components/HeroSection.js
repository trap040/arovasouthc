"use client";

import Link from "next/link";
import BookingForm from "./BookingForm";

const HeroSection = () => {
  return (
    <section className="bg-header-image bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center text-center ">
      <h1 className="text-2xl xs:text-[32px] text-white font-gilda tracking-[.04em] uppercase font-normal max-w-[800px] md:text-[42px]">
        An upcoming vacation gives us something to eagerly anticipate.
      </h1>
      <Link
        href="/about"
        className="min-w-[158px] min-h-[48px] bg-transparent uppercase text-white border-2 font-barlow tracking-widest text-base font-normal inline-flex items-center justify-center mt-9 md:mt-[60px] hover:bg-white hover:text-black transition duration-300 ease-in-out"
      >
        know more
      </Link>

      {/* Booking Form */}
      <div className="w-full max-w-[1200px] mx-auto mt-12">
        <BookingForm />
      </div>
    </section>
  );
};

export default HeroSection;
