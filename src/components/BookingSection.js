import Image from 'next/image';

const BookingSection = () => {
  return (
    <section className="py-16 px-3 bg-booking-image bg-center bg-cover bg-no-repeat">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-center text-white mb-3">
          Hotel Booking Form
        </h2>
        <div className="flex items-center justify-center">
          <Image src="/decorated-pattern.svg" alt="decorated pattern" width={500} height={500} />
        </div>
        <form className="my-16 max-w-[824px] mx-auto">
          <div className="my-3">
            <input
              type="text"
              className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full"
              placeholder="Full Name"
            />
          </div>
          <div className="grid md:grid-cols-2 md:my-3 md:gap-x-10">
            <input
              type="text"
              className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full my-3"
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full my-3"
              placeholder="Email Address (optional)"
            />
          </div>
          <div className="grid md:grid-cols-2 md:my-3 md:gap-x-10">
            <input
              type="text"
              className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full my-3"
              placeholder="Purpose of Booking"
            />
            <select 
              defaultValue="" 
              className="outline-none py-4 px-5 bg-transparent text-white text-lg tracking-[.04em] font-light font-barlow border-white border-solid border-b-[1px] w-full my-3">
              <option value="" disabled>No. of Adult</option>
              <option className="bg-black/30" value="1">1</option>
              <option className="bg-black/30" value="2">2</option>
              <option className="bg-black/30" value="3">3</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 md:my-3 md:gap-x-10">
            <input
              type="date"
              className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full my-3"
            />
            <input
              type="time"
              className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full my-3"
            />
          </div>
          <div className="flex items-center justify-center">
            <a
              href="#"
              className="bg-white font-barlow px-4 min-w-[158px] min-h-[48px] inline-flex items-center justify-center uppercase text-eerie-black transition duration-300 ease-in-out hover:bg-eerie-black hover:text-white mt-8 tracking-widest"
            >
              explore now
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
