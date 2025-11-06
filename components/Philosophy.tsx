"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Philosophy() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FBF7F0] py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div
            className={`col-span-12 ${
              isMobile
                ? ""
                : isTablet
                ? "md:col-span-6"
                : "md:col-span-6 lg:col-span-5"
            } relative overflow-hidden`}
          >
            <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C99A3F]/5 via-[#181818]/5 to-[#C99A3F]/5">
                <Image
                  src="/assets/images/saffron-threads.jpg"
                  alt="Saffron threads macro"
                  fill
                  className={`object-cover ${!isMobile ? "animate-ken-burns" : ""}`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={`col-span-12 ${
              isMobile
                ? "mt-6"
                : isTablet
                ? "md:col-span-6 md:flex md:items-center"
                : "md:col-span-6 lg:col-span-7 lg:flex lg:items-center"
            }`}
          >
            <div className={isMobile ? "px-6" : ""}>
              <div className="font-manrope text-[#C99A3F] text-sm uppercase tracking-wider mb-4">
                INGREDIENTE AUTENTICE
              </div>

              <h3 className="font-canela text-[#181818] text-[32px] md:text-[40px] lg:text-[48px] font-light mb-6 leading-tight">
                Firul de Șofran
              </h3>

              <p className="font-manrope text-[#181818] text-base md:text-[18px] leading-[1.7]">
                Șofranul, cea mai scumpă mirodenie din lume, este responsabil
                pentru culoarea și gustul multora dintre preparate. Este firul
                de aur care leagă bucătăria noastră de tradiție și excelență.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div
            className={`col-span-12 ${
              isMobile
                ? "order-2 mt-6"
                : isTablet
                ? "md:col-span-6 md:order-1 md:flex md:items-center"
                : "md:col-span-6 lg:col-span-7 lg:order-1 lg:flex lg:items-center"
            }`}
          >
            <div className={isMobile ? "px-6" : ""}>
              <div className="font-manrope text-[#C99A3F] text-sm uppercase tracking-wider mb-4">
                RITUAL ȘI OSPITALITATE
              </div>

              <h3 className="font-canela text-[#181818] text-[32px] md:text-[40px] lg:text-[48px] font-light mb-6 leading-tight">
                Povești la o Cafea Arăbească
              </h3>

              <p className="font-manrope text-[#181818] text-base md:text-[18px] leading-[1.7]">
                Dar cele mai frumoase povești se spun la o ceașcă de cafea
                arăbească, cu gust puternic și pregnant, uneori intensificat cu
                cardamon. Este gestul nostru de bun venit și inima ospitalității
                orientale.
              </p>
            </div>
          </div>

          <div
            className={`col-span-12 ${
              isMobile
                ? "order-1 mt-12"
                : isTablet
                ? "md:col-span-6 md:order-2"
                : "md:col-span-6 lg:col-span-5 lg:order-2"
            } relative overflow-hidden`}
          >
            <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C99A3F]/5 via-[#181818]/5 to-[#C99A3F]/5">
                <Image
                  src="/assets/images/arabic-coffee.jpg"
                  alt="Arabic coffee and cardamom"
                  fill
                  className={`object-cover ${!isMobile ? "animate-ken-burns" : ""}`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`text-center pt-12 md:pt-16 lg:pt-20 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <Link
            href="/povestea"
            className="group inline-block w-full md:w-auto font-manrope text-[#C99A3F] text-base md:text-lg font-medium px-8 py-4 border-2 border-[#C99A3F] rounded-sm transition-all duration-300 hover:bg-[#C99A3F] hover:text-[#FBF7F0] text-center"
          >
            DESCOPERĂ POVESTEA COMPLETĂ
          </Link>
        </div>
      </div>
    </section>
  );
}

