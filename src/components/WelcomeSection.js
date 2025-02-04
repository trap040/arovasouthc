"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const WelcomeSection = () => {
  return (
    <section className="bg-nero min-h-[640px] mx-auto px-3 flex items-center py-16">
      <div className="container max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-coyote font-normal opacity-70 tracking-[.25em] font-barlow-cond text-xl sm:text-[22px] uppercase">
            welcome to
          </h3>
          <h1 className="font-gilda text-2xl sm:text-[38px] tracking-[.04em] font-normal py-3 text-white mb-3">
            Arova Hotel & Restaurant
          </h1>
          <p className="opacity-60 font-light font-barlow text-justify text-base sm:text-lg text-white">
            Arova Hotel is located in the Heart of Nairobi. In recent years, Nairobi has expanded its infrastructure, created attractive opportunities for investors and created new jobs for the entire region.
          </p>
          <a
            href="#"
            className="bg-lion font-barlow px-4 min-w-[158px] min-h-[48px] inline-flex items-center justify-center uppercase text-white transition duration-300 ease-in-out hover:bg-lion-dark mt-8 tracking-widest"
          >
            know more
          </a>
        </div>

        
        <div className="welcome-slider overflow-hidden">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-[425px] w-full"
          >
            <SwiperSlide>
              <Image
                className="w-full h-full object-cover"
                src="/images/welcome-img-1.png"
                alt="welcome image"
                width={1200}
                height={425}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="w-full h-full object-cover"
                src="/images/welcome-img-2.png"
                alt="welcome image"
                width={1200}
                height={425}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="w-full h-full object-cover"
                src="/images/welcome-img-3.png"
                alt="welcome image"
                width={1200}
                height={425}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
