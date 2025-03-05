"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="bg-nero py-16 px-3">
        <div className="grid max-w-[1200px] mx-auto gap-8 text-center md:grid-cols-2 md:text-start lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          {/* Logo & Description */}
          <div className="md:me-2 lg:me-3">
            <Link href="/" className="text-lion font-gilda font-normal text-2xl tracking-[.04em]">
              Arova<span className="text-white">Hotel</span>
            </Link>
            <p className="text-white font-light font-barlow text-base mt-3 max-w-[480px] mx-auto md:ms-0">
              Welcome to the best five-star deluxe hotel in Nairobi city.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="inline-block font-gilda tracking-[.04em] text-lg text-white capitalize relative after:absolute after:content-[''] after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-coyote pb-1 mb-4">
              Quick link
            </h4>
            <ul>
              {["our services", "book", "about hotel", "blogs"].map((item, index) => (
                <li key={index} className="my-2">
                  <a href="#" className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="inline-block font-gilda tracking-[.04em] text-lg text-white capitalize relative after:absolute after:content-[''] after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-coyote pb-1 mb-4">
              Explore
            </h4>
            <ul>
              {["rooms & suites", "Conference Room", "special offers", "restaurant"].map((item, index) => (
                <li key={index} className="my-2">
                  <a href="#" className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="inline-block font-gilda tracking-[.04em] text-lg text-white capitalize relative after:absolute after:content-[''] after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-coyote pb-1 mb-4">
              Contact
            </h4>
            <ul>
              <li className="my-2 grid grid-cols-[40px_auto] justify-center md:justify-start">
                <span className="text-white">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                <span className="text-white/50 font-light">South C, Nairobi</span>
              </li>
              <li className="my-2 grid grid-cols-[40px_auto] justify-center md:justify-start ">
                <span className="text-white">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <span className="text-white/50 font-light">+254 719748888</span>
              </li>
              <li className="my-2 grid grid-cols-[40px_auto] justify-center md:justify-start">
                <span className="text-white">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="text-white/50 font-light">arovahotel@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Socials - New separate section with smaller icons */}
          <div>
            <h4 className="inline-block font-gilda tracking-[.04em] text-lg text-white capitalize relative after:absolute after:content-[''] after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-coyote pb-1 mb-4">
              Socials
            </h4>
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="flex items-center text-white hover:text-lion transition-colors group">
                <span className="w-7 h-7 rounded-full bg-lion flex items-center justify-center group-hover:bg-white transition-colors mr-3">
                  <FontAwesomeIcon icon={faFacebookF} className="text-white group-hover:text-lion w-3 h-3" />
                </span>
                <span className="text-white/50 font-light group-hover:text-white/80">Facebook</span>
              </Link>
              
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center text-white hover:text-lion transition-colors group">
                <span className="w-7 h-7 rounded-full bg-lion flex items-center justify-center group-hover:bg-white transition-colors mr-3">
                  <FontAwesomeIcon icon={faInstagram} className="text-white group-hover:text-lion w-3 h-3" />
                </span>
                <span className="text-white/50 font-light group-hover:text-white/80">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-4 text-white font-normal font-barlow uppercase text-center tracking-widest bg-nero-dark">
        <p className="text-sm">&copy;Arova Hotels</p>
      </div>
    </footer>
  );
};

export default Footer;