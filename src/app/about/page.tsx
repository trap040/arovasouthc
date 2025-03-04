// src/app/about/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <Image 
          src="/images/about.jpg" 
          alt="Arova Hotel" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-gilda text-4xl md:text-5xl lg:text-6xl text-white mb-6">About Arova Hotel</h1>
            <div className="w-20 h-1 bg-lion mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Our Story</h2>
              <div className="w-16 h-1 bg-lion mb-8"></div>
              <p className="text-gray-600 mb-6">
                Founded in 2018, Arova Hotel was born from a vision to create an exceptional hospitality 
                experience that combines modern luxury with authentic local culture. Our founder, inspired 
                by years of global travel, sought to establish a sanctuary where travelers could 
                enjoy world-class amenities while immersing themselves in the rich heritage of our location.
              </p>
              <p className="text-gray-600 mb-6">
                What began as a boutique establishment has evolved into a premier destination, 
                recognized for impeccable service and attention to detail. Each space in our hotel has been 
                thoughtfully designed to provide comfort, functionality, and aesthetic appeal.
              </p>
              <p className="text-gray-600">
                Today, Arova Hotel continues to uphold its founding principles of excellence, authenticity, 
                and personalized care, welcoming guests from around the world to experience the perfect 
                blend of luxury and local charm.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/about.jpg" 
                alt="Arova Hotel Lobby" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Our Values</h2>
            <div className="w-16 h-1 bg-lion mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Arova Hotel, our values guide every decision we make and every service we provide. We believe in creating 
              memorable experiences through exceptional hospitality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-lion bg-opacity-10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-gilda text-xl mb-4 text-eerie-black">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the quality of our accommodations to the standards of our service.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-lion bg-opacity-10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-gilda text-xl mb-4 text-eerie-black">Personalization</h3>
              <p className="text-gray-600">
                We believe in personalized experiences tailored to each guest&apos;s unique preferences and needs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-lion bg-opacity-10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-gilda text-xl mb-4 text-eerie-black">Sustainability</h3>
              <p className="text-gray-600">
                We are committed to sustainable practices that respect our environment and support our local community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-gilda text-3xl mb-6 text-eerie-black text-center">Our Leadership Team</h2>
          <div className="w-16 h-1 bg-lion mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Manager Name - General Manager" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-gilda text-xl mb-2 text-eerie-black">Manager Name</h3>
              <p className="text-lion mb-4">General Manager</p>
              <p className="text-gray-600 px-4">
                With over 15 years in luxury hospitality, Sarah brings a wealth of experience and a passion for exceptional service.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Chef Name - Executive Chef" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-gilda text-xl mb-2 text-eerie-black">Chef Name</h3>
              <p className="text-lion mb-4">Executive Chef</p>
              <p className="text-gray-600 px-4">
                A culinary visionary who has transformed our dining experience with innovative menus featuring local and international flavors.
              </p>
            </div>
            
            <div className="text-center lg:col-span-1 md:col-span-2 mx-auto md:max-w-md lg:max-w-none">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Director Name - Guest Relations Director" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-gilda text-xl mb-2 text-eerie-black">Director Name</h3>
              <p className="text-lion mb-4">Guest Relations Director</p>
              <p className="text-gray-600 px-4">
                Maria ensures that every guest&rsquo;s stay exceeds expectations through personalized service and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-16 md:py-24 px-4 bg-eerie-black text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-gilda text-3xl mb-6 text-center">Our Facilities</h2>
          <div className="w-16 h-1 bg-lion mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-lion bg-opacity-20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="font-gilda text-xl mb-2">Fine Dining</h3>
              <p className="text-gray-400">
                Experience culinary excellence at our award-winning restaurant featuring local and international cuisine.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-lion bg-opacity-20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-gilda text-xl mb-2">Wellness Spa</h3>
              <p className="text-gray-400">
                Rejuvenate your body and mind with our comprehensive spa treatments and wellness programs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-lion bg-opacity-20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-gilda text-xl mb-2">Fitness Center</h3>
              <p className="text-gray-400">
                Maintain your fitness routine with our state-of-the-art equipment and professional trainers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-lion bg-opacity-20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lion" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-gilda text-xl mb-2">Conference Rooms</h3>
              <p className="text-gray-400">
                Host your business events and celebrations in our versatile, fully-equipped meeting spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 px-4 bg-light-gray">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Experience Arova Hotel</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We invite you to discover the unique blend of luxury, comfort, and personalized service that defines the Arova Hotel experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms" className="bg-lion hover:bg-lion-dark text-white font-barlow px-8 py-3 inline-block uppercase tracking-widest transition duration-300">
              Explore Rooms
            </Link>
            <Link href="/contact" className="bg-eerie-black hover:bg-gray-700 text-white font-barlow px-8 py-3 inline-block uppercase tracking-widest transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;