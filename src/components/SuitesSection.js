// src/components/SuitesSection.js
import Image from 'next/image';

const SuitesSection = () => {
  return (
    <section className="py-16 px-3">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-coyote text-center mb-3">
          Rooms & Suites
        </h2>
        <div className="flex items-center justify-center">
          <Image
            src="/decorated-pattern-2.svg"
            alt="decorated pattern"
            width={500}
            height={500} // Adjust size as needed
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2 py-10">
          <p className="text-black opacity-60 font-light text-base sm:text-lg font-barlow first-letter:text-4xl first-letter:font-bold first-letter:tracking-[.03em]">
          Experience comfort and luxury in our thoughtfully designed rooms and suites. Whether you&apos;re here for business 
          or leisure, our accommodations offer modern amenities, stylish interiors, 
          and a relaxing ambiance. Choose from a range of options to suit your needs and enjoy a stay like no other.
          </p>

          <ul className="bg-lion py-5 sm:py-9 px-7">
            <li className="grid items-center grid-cols-[32px_auto] my-1">
              <Image
                src="/icons/hotel.svg"
                alt="icon"
                width={32}
                height={32}
              />
              <span className="text-white font-barlow text-base font-light">
                The best prices for your relaxing vacation.
              </span>
            </li>
            <li className="grid items-center grid-cols-[32px_auto] my-1">
              <Image
                src="/icons/hotel.svg"
                alt="icon"
                width={32}
                height={32}
              />
              <span className="text-white font-barlow text-base font-light">
                Ultimate place to spend time with your loved ones.
              </span>
            </li>
            <li className="grid items-center grid-cols-[32px_auto] my-1">
              <Image
                src="/icons/hotel.svg"
                alt="icon"
                width={32}
                height={32}
              />
              <span className="text-white font-barlow text-base font-light">
                Cool place to have an entertaining time.
              </span>
            </li>
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[4px]">
          <a
            href="#"
            className="object-cover relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b from-black/25 to-black/75 hover:before before:absolute before:content-[''] before:top-3 before:left-3 before:right-3 before:bottom-3 before:border-white before:border-2 before:border-solid before:z-10 before:opacity-0 hover:before:opacity-100 before:transition before:duration-300 before:ease-in-out"
          >
            <Image
              src="/images/room-1.png"
              alt="stay room"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute bottom-0 left-2/4 -translate-x-2/4 text-white font-medium uppercase text-xl md:text-2xl font-barlow z-10 px-4 mb-14 text-center w-full tracking-widest">
              Stay Room
            </div>
          </a>

          <a
            href="#"
            className="object-cover relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b from-black/25 to-black/75 hover:before before:absolute before:content-[''] before:top-3 before:left-3 before:right-3 before:bottom-3 before:border-white before:border-2 before:border-solid before:z-10 before:opacity-0 hover:before:opacity-100 before:transition before:duration-300 before:ease-in-out"
          >
            <Image
              src="/images/room-2.png"
              alt="conference/meeting hall"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute bottom-0 left-2/4 -translate-x-2/4 text-white font-medium uppercase text-xl md:text-2xl font-barlow z-10 px-4 mb-14 text-center w-full tracking-widest">
              Conference/Meeting Hall
            </div>
          </a>

          <a
            href="#"
            className="object-cover relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b from-black/25 to-black/75 hover:before before:absolute before:content-[''] before:top-3 before:left-3 before:right-3 before:bottom-3 before:border-white before:border-2 before:border-solid before:z-10 before:opacity-0 hover:before:opacity-100 before:transition before:duration-300 before:ease-in-out"
          >
            <Image
              src="/images/room-3.png"
              alt="wedding room"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute bottom-0 left-2/4 -translate-x-2/4 text-white font-medium uppercase text-xl md:text-2xl font-barlow z-10 px-4 mb-14 text-center w-full tracking-widest">
              Wedding
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuitesSection;
