"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Clock, Phone, Envelope } from "phosphor-react";

export default function ContactLocation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setIsDesktop(width > 1024);
      setIsTablet(width >= 768 && width <= 1023);
      setIsMobile(width < 768);
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.7) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMapClick = () => {
    setIsMapActive(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#181818] py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {(isDesktop || isTablet) && (
            <div
              className={`col-span-12 md:col-span-6 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden">
                {!isMapActive ? (
                  <div
                    onClick={handleMapClick}
                    className="absolute inset-0 bg-[#181818] cursor-pointer flex items-center justify-center z-10 transition-opacity duration-300 hover:opacity-90"
                  >
                    <div className="text-center px-8">
                      <p className="font-manrope text-[#FBF7F0] text-base md:text-lg mb-2">
                        Click to activate map
                      </p>
                      <div className="w-16 h-16 mx-auto border-2 border-[#C99A3F] rounded-full flex items-center justify-center">
                        <MapPin className="text-[#C99A3F] text-2xl" weight="fill" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#181818] via-[#1a1a1a] to-[#181818] opacity-50" />
                  </div>
                ) : null}
                <iframe
                  src="https://www.google.com/maps?q=Calea+Unirii+156,+Craiova,+Romania&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(100%) invert(92%) hue-rotate(180deg) brightness(0.8) contrast(1.2)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={isMapActive ? "" : "pointer-events-none"}
                />
              </div>
            </div>
          )}

          <div
            className={`col-span-12 md:col-span-6 flex flex-col justify-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h2 className="font-canela text-[#FBF7F0] text-[32px] md:text-5xl lg:text-[48px] font-light mb-4">
              Vizitați-ne
            </h2>

            <h3 className="font-manrope text-[#FBF7F0]/70 text-base md:text-[20px] mb-8 md:mb-12">
              Al'Zaatar Craiova
            </h3>

            <div className="mb-6 md:mb-8">
              <div className="flex items-start gap-4 mb-3">
                <MapPin className="text-[#C99A3F] text-xl md:text-2xl flex-shrink-0 mt-1" weight="fill" />
                <div>
                  <p className="font-manrope text-[#FBF7F0] text-base md:text-lg mb-1">
                    Calea Unirii, nr. 156, Craiova
                  </p>
                  <p className="font-manrope text-[#FBF7F0]/70 text-sm md:text-base mb-3">
                    Lângă Centrul Vechi și Parcul Romanescu.
                  </p>
                  <Link
                    href="https://www.google.com/maps/search/?api=1&query=Calea+Unirii+156,+Craiova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-block font-manrope text-[#FBF7F0] text-sm md:text-base font-bold relative pb-1"
                  >
                    <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                      OBȚINE DIRECȚII →
                    </span>
                    <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex items-start gap-4">
                <Clock className="text-[#C99A3F] text-xl md:text-2xl flex-shrink-0 mt-1" weight="fill" />
                <p className="font-manrope text-[#FBF7F0] text-base md:text-lg">
                  Luni – Duminică: 12:00 – 23:00
                </p>
              </div>
            </div>

            <div className="mb-8 md:mb-12 space-y-4">
              <div className="flex items-start gap-4">
                <Phone className="text-[#C99A3F] text-xl md:text-2xl flex-shrink-0 mt-1" weight="fill" />
                <Link
                  href="tel:+40799149848"
                  className="font-manrope text-[#FBF7F0] text-base md:text-lg hover:text-[#C99A3F] transition-colors duration-300"
                >
                  (0799) 149 848
                </Link>
              </div>

              <div className="flex items-start gap-4">
                <Envelope className="text-[#C99A3F] text-xl md:text-2xl flex-shrink-0 mt-1" weight="fill" />
                <Link
                  href="mailto:contact@alzaatar.ro"
                  className="font-manrope text-[#FBF7F0] text-base md:text-lg hover:text-[#C99A3F] transition-colors duration-300 break-all"
                >
                  contact@alzaatar.ro
                </Link>
              </div>
            </div>

            <Link
              href="/rezervare"
              className={`group inline-block font-manrope text-[#181818] text-base md:text-lg font-medium px-8 py-4 bg-[#C99A3F] rounded-sm transition-all duration-300 hover:bg-[#C99A3F]/90 text-center ${
                isMobile ? "w-full" : ""
              }`}
            >
              REZERVARE
            </Link>
          </div>

          {isMobile && (
            <div
              className={`col-span-12 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                {!isMapActive ? (
                  <div
                    onClick={handleMapClick}
                    className="absolute inset-0 bg-[#181818] cursor-pointer flex items-center justify-center z-10 transition-opacity duration-300 hover:opacity-90"
                  >
                    <div className="text-center px-8">
                      <p className="font-manrope text-[#FBF7F0] text-base mb-2">
                        Click to activate map
                      </p>
                      <div className="w-16 h-16 mx-auto border-2 border-[#C99A3F] rounded-full flex items-center justify-center">
                        <MapPin className="text-[#C99A3F] text-2xl" weight="fill" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#181818] via-[#1a1a1a] to-[#181818] opacity-50" />
                  </div>
                ) : null}
                <iframe
                  src="https://www.google.com/maps?q=Calea+Unirii+156,+Craiova,+Romania&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(100%) invert(92%) hue-rotate(180deg) brightness(0.8) contrast(1.2)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={isMapActive ? "" : "pointer-events-none"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

