"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Prevent body scrolling when navbar is open
  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navbarOpen]);

  return (
    <header className="bg-black bg-cover bg-center bg-no-repeat flex flex-col overflow-hidden relative z-50">
      <div className="header-main px-3 flex-1 flex">
        <div className="container max-w-[1200px] mx-auto flex flex-col">
          <nav className="py-5 md:flex md:justify-between">
            <div className="flex justify-between">
              <Link href="/">
                <Image 
                  src="/logo.png" 
                  alt="Arova Hotel Logo"
                  width={100} 
                  height={200} 
                />
              </Link>
              <button 
                type="button" 
                className="text-white md:hidden z-50" 
                onClick={() => setNavbarOpen(!navbarOpen)}
                aria-label="Toggle navigation menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            
            {/* Overlay that appears behind the navbar */}
            {navbarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 md:hidden" 
                onClick={() => setNavbarOpen(false)}
                aria-hidden="true"
              />
            )}
            
            <div
              className={`navbar-box fixed top-0 right-0 w-[280px] h-full bg-white p-5 flex flex-col items-center font-barlow-cond transform transition duration-300 ease-in-out z-50 ${
                navbarOpen ? "translate-x-0" : "translate-x-full"
              } md:relative md:translate-x-0 md:bg-transparent md:flex-row md:h-auto md:w-auto md:p-0 md:z-auto`}
            >
              <button
                type="button"
                className="absolute top-[18px] right-[18px] z-50 text-2xl hover:rotate-180 transition duration-300 ease-in-out md:hidden"
                onClick={() => setNavbarOpen(false)}
                aria-label="Close navigation menu"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <ul className="flex flex-col w-full text-center mt-[60px] md:flex-row md:mt-0">
                {[
                  { name: "Home", link: "/" },
                  { name: "Events", link: "/events" },
                  { name: "Gallery", link: "/gallery" },
                  { name: "About", link: "/about" },
                ].map(({ name, link }) => (
                  <li key={name} className="py-3 border-b-[1px] border-solid md:py-0 md:border-none">
                    <Link
                      href={link}
                      className="text-eerie-black uppercase text-md tracking-[.12em] font-medium hover:text-lion transition duration-300 ease-in-out md:mx-[14px] xl:mx-5 2xl:mx-6 md:text-white"
                      onClick={() => setNavbarOpen(false)} // Close menu when link is clicked
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="w-full h-[42px] px-7 uppercase flex items-center justify-center bg-lion tracking-widest font-medium text-white mt-4 hover:bg-lion-dark md:mt-0 md:min-w-[140px] ms-6"
                onClick={() => setNavbarOpen(false)} // Close menu when link is clicked
              >
                know more
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;