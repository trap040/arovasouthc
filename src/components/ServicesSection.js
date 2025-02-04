'use client';

import Image from 'next/image';

const services = [
  { icon: '/icons/plane.svg', title: 'Pick Up & Drop', description: 'We offer pick ups and drop off from the hotel to different airports and train stations.' },
  { icon: '/icons/vehicle.svg', title: 'Parking Space', description: 'We have an ample parking (call hotel to reserve).' },
  { icon: '/icons/bed.svg', title: 'Room Service', description: 'At Arova, we take pride in hospitality, we offer 24hr Room service to our customers.' },
  { icon: '/icons/pool.svg', title: 'Conference Room', description: 'Do not worry if you are planning for a meeting, wedding or event, Arova has you sorted.' },
  { icon: '/icons/wifi.svg', title: 'Free Internet', description: 'Our facility has connection to one of the fastest internet services in Kenya, Enjoy.' },
  { icon: '/icons/food.svg', title: 'Breakfast', description: 'We offer Bed and Breakfast services, call our reception to reserve.' }
];

export default function ServicesSection() {
  return (
    <section className="py-16 px-3 bg-banner-image bg-center bg-cover bg-fixed bg-no-repeat">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-coyote text-center mb-3">Our Hotel Services</h2>
        <div className="flex items-center justify-center">
          <Image src="/decorated-pattern-2.svg" alt="Decorative Pattern" width={100} height={20} />
        </div>

        <div className="grid gap-3 mt-10 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="flex text-center flex-col justify-center items-center bg-black/30 p-10 hover:bg-black/50 transition duration-300 ease-in-out">
              <Image src={service.icon} alt={service.title} width={54} height={54} />
              <h4 className="mt-4 mb-2 text-lion font-gilda text-xl tracking-[.04em] font-normal">{service.title}</h4>
              <p className="text-white text-base font-barlow font-light tracking-[.04em]">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
