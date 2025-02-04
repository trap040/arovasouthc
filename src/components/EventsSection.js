import Image from 'next/image';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      date: '03',
      month: 'apr',
      title: 'Decade Nights',
      description: 'Saturday Music Fest',
      time: '07:00 PM',
      image: '/images/events-1.png'
    },
    {
      id: 2,
      date: '06',
      month: 'may',
      title: 'Wine Tastings',
      description: 'Special Wine Dinner',
      time: '09:00 PM',
      image: '/images/events-2.png'
    },
    {
      id: 3,
      date: '10',
      month: 'jun',
      title: 'Traditional Wedding',
      description: 'Traditional Private Wedding',
      time: '06:00 PM',
      image: '/images/events-3.png'
    }
  ];

  return (
    <section className="py-16 px-3 bg-white">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-coyote text-center mb-3">
          Events
        </h2>
        <div className="flex items-center justify-center">
          <Image src="/decorated-pattern-2.svg" alt="decorated pattern" width={500} height={500} />
        </div>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {events.map((event) => (
            <div key={event.id} className="min-h-[323px] relative">
              <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" />
              <div className="text-white absolute bottom-2 left-2 right-2 bg-black/50 p-5">
                <div className="w-[70px] h-[70px] bg-lion rounded-full flex items-center justify-center flex-col uppercase font-mont text-sm absolute top-0 right-3 -translate-y-[50%]">
                  <span className="font-bold tracking-widest text-xl inline-block">{event.date}</span>
                  <span className="tracking-widest inline-block -mt-[3px]">{event.month}</span>
                </div>
                <h3 className="font-gilda text-xl tracking-[.04em] uppercase">{event.title}</h3>
                <p className="font-normal tracking-[.04em] font-barlow text-lg">
                  {event.description} - <span className="font-light">{event.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
