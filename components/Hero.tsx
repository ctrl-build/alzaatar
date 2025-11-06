"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error("Video play error:", error);
      });
    }
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#181818] via-[#181818] to-[#2a2a2a]" />
        
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          onLoadedData={() => {
            setVideoLoaded(true);
          }}
          onCanPlay={() => {
            setVideoLoaded(true);
          }}
          onLoadedMetadata={() => {
            setVideoLoaded(true);
          }}
          onError={(e) => {
            console.error("Video loading error:", e);
          }}
        >
          <source src="/assets/videos/hero.webm" type="video/webm" />
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/60 via-[#181818]/40 to-[#181818]/80" />
      </div>

      <button
        onClick={toggleVideo}
        aria-label={isPaused ? "Redare video" : "Pauză video"}
        className="absolute top-24 md:top-28 right-4 md:right-8 z-20 bg-[#181818]/80 hover:bg-[#181818] text-[#FBF7F0] p-3 rounded-sm transition-all focus:outline-2 focus:outline-[#FBF7F0] focus:outline-offset-2"
      >
        {isPaused ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        )}
      </button>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 pt-[100px] lg:pt-[100px] pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`font-canela text-[#FBF7F0] text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-4 transition-all ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDuration: "1.2s", transitionDelay: "0.2s" }}
          >
            Povești cu iz oriental
          </h1>

          <h2
            className={`font-manrope text-[#FBF7F0] text-lg md:text-xl lg:text-2xl font-light mb-6 transition-all ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDuration: "1.2s", transitionDelay: "0.4s" }}
          >
            Bucătărie libaneză autentică în inima Craiovei.
          </h2>

          <div
            className={`flex items-center justify-center gap-2 mb-8 transition-all ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDuration: "1.2s", transitionDelay: "0.6s" }}
          >
            <div className="flex items-center gap-1">
              <span className="text-[#C99A3F] text-xl">★★★★</span>
              <span className="text-[#C99A3F] text-xl relative inline-block w-[1em]">
                <span className="text-[#C99A3F]/30">★</span>
                <span className="absolute left-0 top-0 w-1/2 overflow-hidden">★</span>
              </span>
            </div>
            <span className="text-[#FBF7F0] text-base md:text-lg">
              4.6 / 5 (84 Recenzii)
            </span>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDuration: "1.2s", transitionDelay: "1.5s" }}
          >
            <Link
              href="/rezervare"
              className="group relative font-canela text-base md:text-lg font-medium px-8 py-4 bg-[#C99A3F] text-[#181818] rounded-sm hover:bg-[#B88A2F] transition-all duration-200 hover:scale-[0.98] active:scale-[0.96]"
            >
              REZERVARE
            </Link>

            <Link
              href="/meniu"
              className="group relative font-canela text-base md:text-lg font-medium px-8 py-4 border-2 border-[#FBF7F0] text-[#FBF7F0] rounded-sm hover:bg-[#FBF7F0]/10 transition-all duration-200 hover:scale-[0.98] active:scale-[0.96]"
            >
              VEZI MENIU
            </Link>
          </div>
        </div>

        <div
          className={`absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1.5s" }}
        >
          <svg
            className="w-6 h-6 text-[#C99A3F] animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

