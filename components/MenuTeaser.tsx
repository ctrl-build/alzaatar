"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const MENU_CATEGORIES = [
  {
    id: "mezza",
    title: "MEZZA",
    description: "O selecție de aperitive reci și calde, de la homos-ul tradițional la baba-ghanouj.",
    image: "/assets/images/homos.jpg",
    anchor: "/meniu#mezza",
  },
  {
    id: "jar",
    title: "LA JAR",
    description: "Preparate la jar, arome autentice și texturi perfecte de la grătar.",
    image: "/assets/images/grill.jpg",
    anchor: "/meniu#jar",
  },
  {
    id: "desert",
    title: "DESERT",
    description: "Dulciuri orientale tradiționale, de la kunafe la baklava.",
    image: "/assets/images/kunafe.jpg",
    anchor: "/meniu#desert",
  },
];

export default function MenuTeaser() {
  const router = useRouter();
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);
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

  const handlePanelClick = (anchor: string) => {
    const [path, hash] = anchor.split('#');
    router.push(path);
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#181818] py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div
            className={`font-manrope text-[#C99A3F] text-sm uppercase tracking-wider mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            AROME AUTENTICE
          </div>

          <h2
            className={`font-canela text-[#FBF7F0] text-[32px] md:text-5xl lg:text-[48px] font-light mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            O invitație la masă.
          </h2>

          <p
            className={`font-manrope text-[#FBF7F0]/70 text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            De la mezze-le tradiționale la preparate la jar, explorați o parte
            din meniul nostru.
          </p>
        </div>

        <div
          className={`flex flex-col md:flex-row gap-4 md:gap-6 mb-12 md:mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          {MENU_CATEGORIES.map((category, index) => {
            const isActive = hoveredPanel === category.id || !isDesktop;
            const showDescription = isDesktop && hoveredPanel === category.id;
            const overlayOpacity = isMobile ? 60 : isActive ? 20 : 60;
            
            return (
            <div
              key={category.id}
              className={`group relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden cursor-pointer transition-all duration-500 ${
                isDesktop && hoveredPanel === category.id
                  ? "flex-[1.2]"
                  : isDesktop && hoveredPanel && hoveredPanel !== category.id
                  ? "flex-[0.9]"
                  : "flex-1"
              }`}
              onMouseEnter={() => isDesktop && setHoveredPanel(category.id)}
              onMouseLeave={() => isDesktop && setHoveredPanel(null)}
              onClick={() => handlePanelClick(category.anchor)}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C99A3F]/10 via-[#181818]/5 to-[#C99A3F]/10">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div
                  className="absolute inset-0 bg-[#181818] transition-opacity duration-500"
                  style={{ opacity: overlayOpacity / 100 }}
                />
              </div>

              <div className={`relative z-10 h-full p-6 md:p-8 ${
                isMobile 
                  ? "flex flex-col items-center justify-center gap-4"
                  : "flex flex-col justify-between"
              }`}>
                <div
                  className={`font-canela text-[#FBF7F0] text-3xl md:text-4xl lg:text-5xl font-light transition-all duration-500 ${
                    isMobile
                      ? "text-center"
                      : isActive
                      ? "translate-y-0"
                      : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  }`}
                >
                  {category.title}
                </div>

                {showDescription && (
                  <div
                    className="font-manrope text-[#FBF7F0] text-sm md:text-base leading-relaxed transition-all duration-500 opacity-100 translate-y-0"
                    style={{ maxWidth: "90%" }}
                  >
                    {category.description}
                  </div>
                )}

                <div
                  className={`transition-all duration-500 ${
                    isActive || isMobile
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  } ${!isActive && isDesktop ? "hidden" : ""}`}
                >
                  <span className="group/link inline-block font-manrope text-[#FBF7F0] text-sm md:text-base font-bold relative pb-1">
                    <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                      VEZI DETALII →
                    </span>
                    <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
                  </span>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div
          className={`text-center transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <Link
            href="/meniu"
            className="group inline-block font-manrope text-[#FBF7F0] text-base md:text-lg font-medium px-8 py-4 border-2 border-[#FBF7F0] rounded-sm transition-all duration-300 hover:border-[#C99A3F] hover:text-[#C99A3F] relative"
          >
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
              VEZI MENIUL COMPLET
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}

