"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    id: "ambiance",
    src: "/assets/images/gallery-ambiance.jpg",
    alt: "Sala principală de dining noaptea: iluminat cald și intim creat de felinare orientale, arhitectură maiestuoasă cu arcade ornate, creând un spațiu de ospitalitate autentică libaneză.",
    type: "large-landscape",
  },
  {
    id: "detail",
    src: "/assets/images/gallery-detail.jpg",
    alt: "Detalii arhitecturale orientale: un arcade ornat sau un felinar intricat, sculptat cu măiestrie, capturând esența designului autentic libanez în fiecare detaliu.",
    type: "small-portrait",
  },
  {
    id: "hospitality",
    src: "/assets/images/gallery-hospitality.jpg",
    alt: "Masă pregătită cu măiestrie: șervețele de pergament, tacâmuri aurii, farfurii întunecate, fiecare element aranjat cu grijă pentru a crea o experiență de ospitalitate orientală autentică.",
    type: "small-square",
  },
];

export default function GalleryTeaser() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

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

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentSlide((prev) => (prev + 1) % GALLERY_IMAGES.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  useEffect(() => {
    if (!isTablet && !isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startX = touch.clientX;
      let startY = touch.clientY;

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          e.preventDefault();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - startX;
        const threshold = 50;

        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            handleSwipe("right");
          } else {
            handleSwipe("left");
          }
        }

        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
    };

    const swiper = swiperRef.current;
    if (swiper) {
      swiper.addEventListener("touchstart", handleTouchStart);
      return () => swiper.removeEventListener("touchstart", handleTouchStart);
    }
  }, [isTablet, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#181818] py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="font-manrope text-[#C99A3F] text-sm uppercase tracking-wider mb-4">
            AMBIANȚA NOASTRĂ
          </div>

          <h2 className="font-canela text-[#FBF7F0] text-[32px] md:text-5xl lg:text-[48px] font-light">
            Un Spațiu Pentru Oaspeți.
          </h2>
        </div>

        {isDesktop && (
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            <div
              className={`col-span-12 lg:col-span-7 relative overflow-hidden group cursor-pointer transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="relative aspect-[16/9] lg:aspect-[21/9]">
                <Image
                  src={GALLERY_IMAGES[0].src}
                  alt={GALLERY_IMAGES[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div
              className={`col-span-12 lg:col-span-4 lg:col-start-8 relative overflow-hidden group cursor-pointer transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="relative aspect-[3/4] mt-8 lg:mt-[50px]">
                <Image
                  src={GALLERY_IMAGES[1].src}
                  alt={GALLERY_IMAGES[1].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div
              className={`col-span-12 lg:col-span-4 lg:col-start-2 relative overflow-hidden group cursor-pointer transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <div className="relative aspect-square -mt-8 lg:-mt-16">
                <Image
                  src={GALLERY_IMAGES[2].src}
                  alt={GALLERY_IMAGES[2].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div
              className={`col-span-12 lg:col-span-5 lg:col-start-7 flex flex-col justify-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.5s" }}
            >
              <div className="lg:pl-8">
                <h3 className="font-canela text-[#FBF7F0] text-[32px] md:text-[40px] lg:text-[48px] font-light mb-6 leading-tight">
                  Vedeți Galeria Completă
                </h3>
                <p className="font-manrope text-[#FBF7F0]/70 text-base md:text-[18px] leading-relaxed mb-8">
                  Explorați spațiul nostru, de la detaliile orientale la mesele
                  pregătite pentru oaspeți.
                </p>
                <Link
                  href="/galerie"
                  className="group/link inline-block font-manrope text-[#FBF7F0] text-base md:text-lg font-bold relative pb-1"
                >
                  <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                    EXPLOREAZĂ GALERIA →
                  </span>
                  <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {isTablet && (
          <div className="space-y-8">
            <div
              ref={swiperRef}
              className="relative overflow-hidden -mx-4 px-4"
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * (100 / 2.5)}%)`,
                }}
              >
                {GALLERY_IMAGES.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / 2.5}%` }}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/galerie"
                className="group/link inline-block font-manrope text-[#FBF7F0] text-base md:text-lg font-bold relative pb-1"
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                  EXPLOREAZĂ GALERIA →
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
              </Link>
            </div>
          </div>
        )}

        {isMobile && (
          <div className="space-y-8">
            <div
              ref={swiperRef}
              className={`relative overflow-hidden w-full transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {GALLERY_IMAGES.map((image) => (
                  <div
                    key={image.id}
                    className="flex-shrink-0 w-full"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {GALLERY_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-[#C99A3F] w-6"
                        : "bg-[#C99A3F]/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/galerie"
                className="group/link inline-block font-manrope text-[#FBF7F0] text-base font-bold relative pb-1"
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                  EXPLOREAZĂ GALERIA →
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

