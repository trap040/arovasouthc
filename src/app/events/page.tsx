'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Event {
  id: number;
  date: string;
  month: string;
  title: string;
  description: string;
  time: string;
  image: string;
  location: string;
  details: string;
  category: string;
}

export default function EventsPage() {
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'dining', name: 'Dining' },
    { id: 'special', name: 'Special Occasions' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Extended events data with more details
  const events: Event[] = [
    {
      id: 1,
      date: '03',
      month: 'apr',
      title: 'Decade Nights',
      description: 'Saturday Music Fest',
      time: '07:00 PM',
      image: '/images/events-1.png',
      location: 'Conference Room',
      details: 'Join us for an unforgettable night of music spanning the decades. Our live band will take you on a journey through the greatest hits from the 60s to today. Enjoy specialty cocktails and a vibrant atmosphere perfect for dancing the night away.',
      category: 'entertainment'
    },
    {
      id: 2,
      date: '06',
      month: 'may',
      title: 'Wine Tastings',
      description: 'Special Dinner',
      time: '09:00 PM',
      image: '/images/events-2.png',
      location: 'Restaurant',
      details: 'Experience an exquisite evening of fine wines paired with a specially crafted five-course meal by our executive chef. This intimate dining event features selections from premium vineyards and expert guidance from our resident sommelier.',
      category: 'dining'
    },
    {
      id: 3,
      date: '10',
      month: 'jun',
      title: 'Traditional Wedding',
      description: 'Traditional Private Wedding',
      time: '06:00 PM',
      image: '/images/events-3.png',
      location: 'Garden Pavilion',
      details: 'Witness the beauty of cultural traditions in this stunning wedding ceremony. Our hotel provides the perfect backdrop for this elegant celebration of love, featuring traditional decor, music, and a customized menu that honors heritage.',
      category: 'special'
    },
    {
      id: 4,
      date: '15',
      month: 'apr',
      title: 'Dinner',
      description: 'Dinner Taste',
      time: '08:30 PM',
      image: '/images/events.jpg',
      location: 'Lounge',
      details: 'Immerse yourself in the smooth sounds of live jazz with our resident quartet. Enjoy premium cocktails and light appetizers in our intimate lounge setting as you unwind to classic and contemporary jazz arrangements.',
      category: 'entertainment'
    },
    {
      id: 5,
      date: '22',
      month: 'Feb',
      title: 'Launch',
      description: 'Exclusive Culinary Experience',
      time: '07:30 PM',
      image: '/images/events2.jpg',
      location: 'Private Dining Room',
      details: 'An exclusive opportunity to dine at our chefs table. This intimate experience includes personal interaction with our executive chef, a behind-the-scenes kitchen tour, and a personalized tasting menu featuring seasonal ingredients.',
      category: 'dining'
    },
    {
      id: 6,
      date: '30',
      month: 'jun',
      title: 'Gala Dinner',
      description: 'Annual Charity Gala',
      time: '07:00 PM',
      image: '/images/events3.jpg',
      location: 'Grand Ballroom',
      details: 'Join us for our annual charity gala supporting local community initiatives. The evening features a gourmet dinner, live entertainment, silent auction, and dancing. Formal attire required for this prestigious event.',
      category: 'special'
    }
  ];
  
  // Filter events based on active category
  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);
  
  // Group events by month for the calendar view
  const eventsByMonth = events.reduce((acc, event) => {
    const monthKey = event.month.toUpperCase();
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
  
  // Function to format month name
  const formatMonth = (month: string) => {
    const months: Record<string, string> = {
      'jan': 'January',
      'feb': 'February',
      'mar': 'March',
      'apr': 'April',
      'may': 'May',
      'jun': 'June',
      'jul': 'July',
      'aug': 'August',
      'sep': 'September',
      'oct': 'October',
      'nov': 'November',
      'dec': 'December'
    };
    return months[month.toLowerCase()] || month;
  };
  
  // Handle modal open/close
  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden';
  };
  
  const closeEventDetails = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <Image 
          src="/images/events.jpg" 
          alt="Arova Hotel Events" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-gilda text-4xl md:text-5xl lg:text-6xl text-white mb-6">Hotel Events</h1>
            <div className="w-20 h-1 bg-lion mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Events Introduction */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Upcoming Events</h2>
            <div className="w-16 h-1 bg-lion mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Join us for a variety of exciting events at Arova Hotel. From live music and cultural celebrations 
              to exclusive dining experiences, we offer memorable moments for every occasion.
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-lion text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Events Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openEventDetails(event)}
              >
                <div className="relative h-64">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Date badge */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-lion rounded-full flex items-center justify-center flex-col text-white z-10 shadow-md">
                    <span className="font-bold text-xl leading-none">{event.date}</span>
                    <span className="uppercase text-xs tracking-wider">{event.month}</span>
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center text-white opacity-75 text-sm mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <h3 className="font-gilda text-xl text-white mb-1">{event.title}</h3>
                  <p className="text-white text-sm opacity-90">{event.description}</p>
                  
                  {/* View details button - visible on hover */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center text-lion text-sm font-medium hover:text-white transition-colors">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state when no events match filter */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No events found in this category.</p>
              <button 
                className="mt-4 px-6 py-2 bg-lion text-white rounded-full hover:bg-lion-dark transition-colors"
                onClick={() => setActiveCategory('all')}
              >
                View All Events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Events Calendar</h2>
            <div className="w-16 h-1 bg-lion mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Plan your stay around our exciting events. Here's a glimpse of what's happening at Arova Hotel in the coming months.
            </p>
          </div>
          
          <div className="space-y-8">
            {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
              <div key={month} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-gilda text-2xl text-eerie-black mb-4 border-b border-gray-200 pb-2">
                  {formatMonth(month)} Events
                </h3>
                <div className="space-y-4">
                  {monthEvents.map(event => (
                    <div 
                      key={event.id} 
                      className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => openEventDetails(event)}
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-lion rounded-lg flex items-center justify-center text-white">
                        <span className="text-xl font-bold">{event.date}</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-gilda text-lg text-eerie-black">{event.title}</h4>
                        <p className="text-gray-600 text-sm">{event.time} | {event.location}</p>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <span className="px-3 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                          {categories.find(cat => cat.id === event.category)?.name.replace('Events', '').trim()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Host Your Event Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/events.jpg" 
                alt="Host Your Event" 
                fill
                className="object-cover" 
              />
            </div>
            <div>
              <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Host Your Event With Us</h2>
              <div className="w-16 h-1 bg-lion mb-8"></div>
              <p className="text-gray-600 mb-6">
                Whether you're planning a corporate meeting, wedding reception, or special celebration, 
                Arova Hotel offers elegant venues and professional planning services to make your event exceptional.
              </p>
              <p className="text-gray-600 mb-6">
                Our experienced event coordinators will work closely with you to customize every detail, 
                from menu selection to decor, ensuring a memorable experience for you and your guests.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-lion bg-opacity-10 rounded-full flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-eerie-black">Versatile Spaces</h3>
                    <p className="text-gray-600">Multiple venue options to accommodate groups of any size</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-lion bg-opacity-10 rounded-full flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-eerie-black">Customized Catering</h3>
                    <p className="text-gray-600">Exceptional dining experiences tailored to your preferences</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-lion bg-opacity-10 rounded-full flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-eerie-black">Dedicated Coordinators</h3>
                    <p className="text-gray-600">Professional planning assistance from concept to completion</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="bg-lion hover:bg-lion-dark text-white px-8 py-3 inline-block transition-colors duration-300 font-barlow uppercase tracking-widest"
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeEventDetails()}
        >
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="relative h-64 md:h-72">
              <Image 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                fill
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              
              <button 
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
                onClick={closeEventDetails}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-gilda text-3xl text-white mb-2">{selectedEvent.title}</h2>
                <p className="text-white text-opacity-90">{selectedEvent.description}</p>
              </div>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    <span className="font-bold">{selectedEvent.date}</span> {formatMonth(selectedEvent.month)}
                  </span>
                </div>
                
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{selectedEvent.time}</span>
                </div>
                
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedEvent.location}</span>
                </div>
                
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lion mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>
                    {categories.find(cat => cat.id === selectedEvent.category)?.name.replace('Events', '').trim()}
                  </span>
                </div>
              </div>
              
              <h3 className="font-gilda text-xl text-eerie-black mb-4">Event Details</h3>
              <p className="text-gray-600 mb-6">{selectedEvent.details}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-gilda text-lg text-eerie-black mb-2">Reservation Information</h3>
                <p className="text-gray-600 mb-4">
                  To reserve your spot for this event, please contact our events team or make a reservation through our online system.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="#" 
                    className="bg-lion hover:bg-lion-dark text-white text-center px-6 py-2 transition-colors duration-300"
                  >
                    Reserve Now
                  </a>
                  <a 
                    href="#" 
                    className="border border-gray-300 hover:border-lion text-gray-700 hover:text-lion text-center px-6 py-2 transition-colors duration-300"
                  >
                    Contact Event Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}