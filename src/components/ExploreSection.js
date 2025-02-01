// src/components/ExploreSection.js
import Image from 'next/image';

const ExploreSection = () => {
  return (
    <section className="min-h-[600px] py-16 flex flex-col items-center justify-center bg-banner-image bg-center bg-cover bg-fixed bg-no-repeat px-3">
      <div className="container max-w-[1200px] mx-auto text-white text-center">
        <h2 className="font-gilda font-normal text-2xl sm:text-[38px] tracking-[.04em] mb-3">
          Relax in our bedrooms with Comfy Couches and Beds.
        </h2>
        <div className="flex items-center justify-center">
          <Image
            src="/decorated-pattern.svg"
            alt="decorated pattern"
            width={500}
            height={500} 
          />
        </div>
        <p className="mt-9 tracking-[.04em] text-lg sm:text-2xl font-barlow font-light max-w-[600px] mx-auto leading-7 sm:leading-9">
          Everything for an active vacation and luxury experience lover.
        </p>
        <a
          href="#"
          className="bg-lion font-barlow px-4 min-w-[158px] min-h-[48px] inline-flex items-center justify-center uppercase text-white transition duration-300 ease-in-out hover:bg-lion-dark mt-8 tracking-widest"
        >
          explore now
        </a>
      </div>
    </section>
  );
};

export default ExploreSection;
