"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandIntroduction() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-start md:items-center">
          <div className="col-span-12 md:col-span-6 relative z-[1]">
            <div
              ref={imageRef}
              className={`relative w-full aspect-[3/4] md:aspect-[4/5] transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100"                 : "opacity-0 scale-[0.95]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C99A3F]/10 via-[#181818]/5 to-[#C99A3F]/10 rounded-sm overflow-hidden">
                {!imageError && (
                  <Image
                    src="/assets/images/architecture-placeholder.jpg"
                    alt="Majestic architecture of Al Zaatar - ornate archway, rich wall textures, warm lantern patterns"
                    fill
                    className="object-cover"
                    priority
                    onError={() => setImageError(true)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-[#181818]/10 via-transparent to-[#C99A3F]/5" />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 md:pl-6 relative z-[2] mt-8 md:mt-0">
            <div className="bg-[#FBF7F0] md:px-0 py-0">
              <div className="px-6 md:px-0">
              <div
                className={`font-manrope text-[#C99A3F] text-sm uppercase tracking-wider mb-4 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                POVESTEA NOASTRĂ
              </div>

              <h2
                className={`font-canela text-[#181818] text-[32px] md:text-[40px] font-light mb-6 leading-tight transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                Un Majlis în inima Craiovei.
              </h2>

              <div
                className={`font-manrope text-[#181818] text-base md:text-[18px] leading-relaxed mb-8 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.4s", lineHeight: "1.6" }}
              >
                <p className="mb-4">
                  Într-un cadru de o arhitectură maiestuoasă, aducem reputația
                  internațională și bogăția de arome ale bucătăriei libaneze.
                  Spunem povești cu iz oriental prin preparate delicioase, pline
                  de arome exotice.
                </p>
                <p>
                  Orientul Mijlociu vă așteaptă aici, la câțiva pași de Centrul
                  Vechi al Craiovei.
                </p>
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <Link
                  href="/povestea"
                  className="group inline-block font-manrope text-[#181818] text-[16px] font-bold relative pb-1"
                >
                  <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                    DESCOPERĂ POVESTEA COMPLETĂ
                  </span>
                  <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

