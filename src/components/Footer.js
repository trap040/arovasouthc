"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
  return (
    <footer>
      <div className="bg-nero py-16 px-3">
        <div className="grid max-w-[1200px] mx-auto gap-8 text-center md:grid-cols-2 md:text-start lg:grid-cols-footer">
          {/* Logo & Description */}
          <div className="md:me-2 lg:me-3">
            <a href="/" className="text-lion font-gilda font-normal text-2xl tracking-[.04em]">
              Arova<span className="text-white">Hotel</span>
            </a>
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
                <span className="text-white/50 font-light">+254 71234567</span>
              </li>
              <li className="my-2 grid grid-cols-[40px_auto] justify-center md:justify-start">
                <span className="text-white">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="text-white/50 font-light">arova@gmail.com</span>
              </li>
            </ul>
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
