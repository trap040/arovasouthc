'use client';

import Image from 'next/image';

const GallerySection = () => {
  const galleryItems = [
    { src: '/images/gallery-1.png', title: 'VIP Room' },
    { src: '/images/gallery-2.png', title: 'Sitting Area' },
    { src: '/images/gallery-3.png', title: 'Amenities' },
    { src: '/images/gallery-4.png', title: 'Keyless Doors' },
    { src: '/images/gallery-5.png', title: 'Friendly Reception' },
    { src: '/images/gallery-6.png', title: '24/7 Reception' },
  ];

  return (
    <section className="py-16 px-3 bg-light-gray">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-gilda font-normal text-3xl text-[46px] tracking-[.04em] text-coyote text-center mb-3">
          Gallery
        </h2>
        <div className="flex items-center justify-center">
          <Image src="/decorated-pattern-2.svg" alt="" width={100} height={20} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mt-10">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group min-h-[260px] relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/75 after:to-black/5 after:opacity-0 hover:after:opacity-100 after:transition after:duration-300 after:ease-in-out overflow-hidden"
            >
              <Image src={item.src} alt={item.title} className="w-full h-full object-cover" width={400} height={260} />
              <div className="bg-lion text-white py-2 px-4 flex items-center justify-between absolute bottom-3 left-0 z-10 -translate-x-full group-hover:translate-x-0 transition duration-300 ease-in-out w-4/5">
                <span className="font-barlow text-lg font-normal">{item.title}</span>
                <ul className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <li key={i} className="text-sm ms-1">
                      <i className="fas fa-star"></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
