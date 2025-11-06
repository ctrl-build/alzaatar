"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const REVIEWS = [
  {
    id: 1,
    stars: 5,
    quote: "Foarte de treaba ospatarul, Suzan.",
    author: "Andreea-Daria M.",
    source: "Recenzie de pe Bookingham.ro",
  },
  {
    id: 2,
    stars: 5,
    quote: "Mâncare excelentă și servire impecabilă. Recomand cu căldură!",
    author: "Mihai P.",
    source: "Recenzie de pe Bookingham.ro",
  },
  {
    id: 3,
    stars: 4,
    quote: "Ambient plăcut și autentic. Ne-am simțit ca acasă.",
    author: "Elena C.",
    source: "Recenzie de pe Bookingham.ro",
  },
  {
    id: 4,
    stars: 5,
    quote: "Cea mai bună bucătărie libaneză din oraș. Meritați cele 5 stele!",
    author: "Alexandru D.",
    source: "Recenzie de pe Bookingham.ro",
  },
];

export default function Reviews() {
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isMobile) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

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
          prevSlide();
        } else {
          nextSlide();
        }
      }
    };

    const swiper = swiperRef.current;
    if (swiper) {
      swiper.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
      return () => {
        swiper.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isMobile]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1 mb-6">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-[#C99A3F] text-2xl md:text-3xl">
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span className="text-[#C99A3F] text-2xl md:text-3xl relative inline-block">
            <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <span className="text-[#C99A3F]">★</span>
            </span>
            <span className="text-[#C99A3F]/30">★</span>
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-[#C99A3F]/30 text-2xl md:text-3xl">
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FBF7F0] py-20 md:py-32 overflow-hidden"
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
            CE SPUN OASPEȚII
          </div>

          <h2 className="font-canela text-[#181818] text-[32px] md:text-5xl lg:text-[48px] font-light mb-6">
            O reputație de 4.6 stele.
          </h2>

          <p className="font-manrope text-[#181818]/70 text-base md:text-[18px]">
            Evaluat de 84 de oaspeți pe Bookingham.ro.
          </p>
        </div>

        {(isDesktop || isTablet) && (
          <div
            className={`relative mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-[#181818] hover:text-[#C99A3F] transition-colors duration-300 focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2"
              aria-label="Recenzie anterioară"
            >
              <span className="text-3xl font-light" aria-hidden="true">&lt;</span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-[#181818] hover:text-[#C99A3F] transition-colors duration-300 focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2"
              aria-label="Recenzie următoare"
            >
              <span className="text-3xl font-light" aria-hidden="true">&gt;</span>
            </button>

            <div className="relative overflow-hidden px-16" role="region" aria-label="Recenzii oaspeți" aria-live="polite">
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0 w-full max-w-3xl transition-all duration-500">
                  <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg">
                    {renderStars(REVIEWS[currentSlide].stars)}
                    <blockquote className="font-canela text-[#181818] text-2xl md:text-[32px] leading-relaxed mb-6">
                      "{REVIEWS[currentSlide].quote}"
                    </blockquote>
                    <div className="font-manrope text-[#181818] font-bold mb-2">
                      — {REVIEWS[currentSlide].author}
                    </div>
                    <div className="font-manrope text-[#181818]/60 text-sm">
                      {REVIEWS[currentSlide].source}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Navigare recenzii">
              {REVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Recenzie ${index + 1} din ${REVIEWS.length}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2 ${
                    index === currentSlide
                      ? "bg-[#C99A3F] w-6"
                      : "bg-[#C99A3F]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {isMobile && (
          <div
            className={`mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div
              ref={swiperRef}
              className="relative overflow-hidden w-full"
              role="region"
              aria-label="Recenzii oaspeți"
              aria-live="polite"
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0 w-full px-6"
                  >
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                      {renderStars(review.stars)}
                      <blockquote className="font-canela text-[#181818] text-2xl leading-relaxed mb-6">
                        "{review.quote}"
                      </blockquote>
                      <div className="font-manrope text-[#181818] font-bold mb-2">
                        — {review.author}
                      </div>
                      <div className="font-manrope text-[#181818]/60 text-sm">
                        {review.source}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Navigare recenzii">
              {REVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Recenzie ${index + 1} din ${REVIEWS.length}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2 ${
                    index === currentSlide
                      ? "bg-[#C99A3F] w-6"
                      : "bg-[#C99A3F]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div
          className={`text-center transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <Link
            href="/rezervare"
            className={`group inline-block font-manrope text-[#181818] text-base md:text-lg font-medium px-8 py-4 bg-[#C99A3F] rounded-sm transition-all duration-300 hover:bg-[#C99A3F]/90 ${
              isMobile ? "w-full md:w-auto" : ""
            } text-center`}
          >
            REZERVARE
          </Link>
        </div>
      </div>
    </section>
  );
}

