"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default function PovesteaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    if (isDesktop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleScroll = () => {
      if (containerRef.current && isDesktop) {
        const scrollLeft = containerRef.current.scrollLeft;
        const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current && isDesktop) {
        e.preventDefault();
        containerRef.current.scrollLeft += e.deltaY;
      }
    };

    if (containerRef.current && isDesktop) {
      containerRef.current.addEventListener("scroll", handleScroll);
      containerRef.current.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("resize", checkDesktop);
      document.body.style.overflow = "";
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
        containerRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isDesktop]);

  return (
    <div className="min-h-screen bg-[#181818]">
      {isDesktop ? (
        <div
          ref={containerRef}
          className="fixed inset-0 overflow-x-auto overflow-y-hidden"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex" style={{ width: "500vw", height: "100vh" }}>
            <Chapter1 />
            <Chapter2 />
            <Chapter3 />
            <Chapter4 />
            <Chapter5 />
          </div>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="w-64 h-1 bg-[#181818]/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C99A3F] transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-16 md:pt-0 bg-[#FBF7F0] md:bg-[#181818]">
          <div className="md:hidden bg-[#FBF7F0] py-12 px-6">
            <h1 className="font-manrope text-[#181818] text-sm uppercase tracking-wider text-center mb-4">
              POVESTEA NOASTRĂ
            </h1>
          </div>
          <div>
            <Chapter1Vertical />
            <Chapter2Vertical />
            <Chapter3Vertical />
            <Chapter4Vertical />
            <Chapter5Vertical />
          </div>
        </div>
      )}
    </div>
  );
}

function Chapter1() {
  return (
    <section
      className="relative w-screen h-screen flex items-center justify-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/gallery-ambiance.jpg"
          alt="Un cadru specific oriental: arhitectură maiestuoasă cu arcade ornate, iluminat cald și intim, creând un spațiu de ospitalitate autentică libaneză în inima Craiovei."
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/60 via-[#181818]/40 to-[#181818]/60 z-10" />
      <div className="relative z-20 max-w-4xl px-8 text-center">
        <h1 className="font-canela text-[#FBF7F0] text-5xl md:text-6xl lg:text-7xl mb-6">
          Un Cadru Specific Oriental
        </h1>
        <p className="font-manrope text-[#FBF7F0] text-lg md:text-xl lg:text-2xl leading-relaxed">
          Al' Zaátar aduce pe meleaguri autohtone elementele arhitecturale care creează un cadru
          specific oriental. Orientul Mijlociu te așteaptă foarte aproape de Centrul Vechi al
          Craiovei.
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="font-manrope text-[#C99A3F] text-sm uppercase tracking-wider">
            Scroll →
          </span>
          <div className="w-px h-8 bg-[#C99A3F]" />
        </div>
      </div>
    </section>
  );
}

function Chapter1Vertical() {
  const imageReveal = useScrollReveal();
  const textReveal = useScrollReveal();

  return (
    <section className="flex flex-col md:flex-row md:h-screen w-full">
      <div
        ref={imageReveal.ref}
        className="relative w-full h-[60vh] md:h-full md:w-1/2"
        style={{
          opacity: imageReveal.isVisible ? 1 : 0,
          transform: imageReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        }}
      >
        <Image
          src="/assets/images/gallery-ambiance.jpg"
          alt="Majestic Architecture"
          fill
          className="object-cover"
        />
      </div>
      <div
        ref={textReveal.ref}
        className="w-full md:h-full md:w-1/2 bg-[#FBF7F0] md:bg-[#181818] py-12 md:py-0 px-6 md:px-12 flex items-center justify-center"
        style={{
          opacity: textReveal.isVisible ? 1 : 0,
          transform: textReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s",
        }}
      >
        <div className="max-w-2xl">
          <h2 className="font-canela text-[#181818] md:text-[#FBF7F0] text-3xl md:text-5xl lg:text-6xl mb-6">
            Un Cadru Specific Oriental
          </h2>
          <p className="font-manrope text-[#181818] md:text-[#FBF7F0] text-base md:text-lg lg:text-xl leading-relaxed">
            Al' Zaátar aduce pe meleaguri autohtone elementele arhitecturale care creează un cadru
            specific oriental. Orientul Mijlociu te așteaptă foarte aproape de Centrul Vechi al
            Craiovei.
          </p>
        </div>
      </div>
    </section>
  );
}

function Chapter2() {
  return (
    <section
      className="relative w-screen h-screen flex items-center justify-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/gallery-hospitality.jpg"
          alt="Maeștrii bucătari la lucru: mâini pricepute care prepară mezze tradiționale libaneze folosind ingrediente aduse din Liban, de cea mai bună calitate, sub îndrumarea celebrului bucătar Fouad."
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/60 via-[#181818]/40 to-[#181818]/60 z-10" />
      <div className="relative z-20 max-w-4xl px-8 text-center">
        <h2 className="font-canela text-[#FBF7F0] text-5xl md:text-6xl lg:text-7xl mb-6">
          Măiestria Bucătarilor
        </h2>
        <p className="font-manrope text-[#FBF7F0] text-lg md:text-xl lg:text-2xl leading-relaxed">
          Veniți de pe meleaguri orientale, maeștrii bucătari, în frunte cu celebrul bucătar Fouad,
          prepară mezze-le tradițional libaneze folosind ingrediente aduse din Liban, de cea mai
          bună calitate.
        </p>
      </div>
    </section>
  );
}

function Chapter2Vertical() {
  const imageReveal = useScrollReveal();
  const textReveal = useScrollReveal();

  return (
    <section className="flex flex-col md:flex-row-reverse md:h-screen w-full">
      <div
        ref={imageReveal.ref}
        className="relative w-full h-[60vh] md:h-full md:w-1/2"
        style={{
          opacity: imageReveal.isVisible ? 1 : 0,
          transform: imageReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        }}
      >
        <Image
          src="/assets/images/gallery-hospitality.jpg"
          alt="Maeștrii bucătari la lucru: mâini pricepute care prepară mezze tradiționale libaneze folosind ingrediente aduse din Liban, de cea mai bună calitate, sub îndrumarea celebrului bucătar Fouad."
          fill
          className="object-cover"
        />
      </div>
      <div
        ref={textReveal.ref}
        className="w-full md:h-full md:w-1/2 bg-[#FBF7F0] md:bg-[#181818] py-12 md:py-0 px-6 md:px-12 flex items-center justify-center"
        style={{
          opacity: textReveal.isVisible ? 1 : 0,
          transform: textReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s",
        }}
      >
        <div className="max-w-2xl">
          <h2 className="font-canela text-[#181818] md:text-[#FBF7F0] text-3xl md:text-5xl lg:text-6xl mb-6">
            Măiestria Bucătarilor
          </h2>
          <p className="font-manrope text-[#181818] md:text-[#FBF7F0] text-base md:text-lg lg:text-xl leading-relaxed">
            Veniți de pe meleaguri orientale, maeștrii bucătari, în frunte cu celebrul bucătar Fouad,
            prepară mezze-le tradițional libaneze folosind ingrediente aduse din Liban, de cea mai
            bună calitate.
          </p>
        </div>
      </div>
    </section>
  );
}

function Chapter3() {
  return (
    <section
      className="relative w-screen h-screen flex items-center justify-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 z-0 flex">
        <div className="w-1/2 h-full relative">
          <Image
            src="/assets/images/homos.jpg"
            alt="Ingrediente autentice: nucșoară, chimen, turmeric și șofran, cea mai scumpă mirodenie din lume, așezate pe o suprafață de pergament, reprezentând firul de aur care leagă bucătăria de tradiție și excelență."
            fill
            className="object-cover"
          />
        </div>
        <div className="w-1/2 h-full relative">
          <Image
            src="/assets/images/grill.jpg"
            alt="Cuptoare de cărămidă tradiționale: focul strălucitor și căldura care pregătesc faimoasele Manakish-uri după rețete tradiționale, simbol al meșteșugului autentic libanez."
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/60 via-[#181818]/40 to-[#181818]/60 z-10" />
      <div className="relative z-20 max-w-4xl px-8 text-center">
        <h2 className="font-canela text-[#FBF7F0] text-5xl md:text-6xl lg:text-7xl mb-6">
          Savoare Autentică
        </h2>
        <p className="font-manrope text-[#FBF7F0] text-lg md:text-xl lg:text-2xl leading-relaxed">
          Carnea servite cu lipie caldă, proaspătă, pregătită în bucătăria noastră. Faimoasele
          Manakish-uri sunt gătite după rețete tradiționale în cuptoare de cărămidă. Nucșoara,
          chimenul, turmericul... Șofranul, cea mai scumpă mirodenie din lume.
        </p>
      </div>
    </section>
  );
}

function Chapter3Vertical() {
  const imageReveal = useScrollReveal();
  const textReveal = useScrollReveal();

  return (
    <section className="flex flex-col md:h-screen w-full bg-[#FBF7F0] md:bg-[#181818]">
      <div
        ref={imageReveal.ref}
        className="w-full h-[60vh] md:h-full flex"
        style={{
          opacity: imageReveal.isVisible ? 1 : 0,
          transform: imageReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        }}
      >
        <div className="w-1/2 h-full relative">
          <Image
            src="/assets/images/homos.jpg"
            alt="Ingrediente autentice: nucșoară, chimen, turmeric și șofran, cea mai scumpă mirodenie din lume, așezate pe o suprafață de pergament, reprezentând firul de aur care leagă bucătăria de tradiție și excelență."
            fill
            className="object-cover"
          />
        </div>
        <div className="w-1/2 h-full relative">
          <Image
            src="/assets/images/grill.jpg"
            alt="Cuptoare de cărămidă tradiționale: focul strălucitor și căldura care pregătesc faimoasele Manakish-uri după rețete tradiționale, simbol al meșteșugului autentic libanez."
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div
        ref={textReveal.ref}
        className="w-full py-12 md:py-0 px-6 md:px-12 flex items-center justify-center"
        style={{
          opacity: textReveal.isVisible ? 1 : 0,
          transform: textReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s",
        }}
      >
        <div className="max-w-2xl">
          <h2 className="font-canela text-[#181818] md:text-[#FBF7F0] text-3xl md:text-5xl lg:text-6xl mb-6">
            Savoare Autentică
          </h2>
          <p className="font-manrope text-[#181818] md:text-[#FBF7F0] text-base md:text-lg lg:text-xl leading-relaxed">
            Carnea servite cu lipie caldă, proaspătă, pregătită în bucătăria noastră. Faimoasele
            Manakish-uri sunt gătite după rețete tradiționale în cuptoare de cărămidă. Nucșoara,
            chimenul, turmericul... Șofranul, cea mai scumpă mirodenie din lume.
          </p>
        </div>
      </div>
    </section>
  );
}

function Chapter4() {
  return (
    <section
      className="relative w-screen h-screen flex items-center justify-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
          <source src="/assets/videos/hero.webm" type="video/webm" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/60 via-[#181818]/40 to-[#181818]/60 z-10" />
      <div className="relative z-20 max-w-4xl px-8 text-center">
        <h2 className="font-canela text-[#FBF7F0] text-5xl md:text-6xl lg:text-7xl mb-6">
          Ritualul Poveștilor
        </h2>
        <p className="font-manrope text-[#FBF7F0] text-lg md:text-xl lg:text-2xl leading-relaxed">
          Dar cele mai frumoase povești se spun la o ceașcă de cafea arabească, cu gust puternic și
          pregnant, uneori intensificat cu cardamon.
        </p>
      </div>
    </section>
  );
}

function Chapter4Vertical() {
  const imageReveal = useScrollReveal();
  const textReveal = useScrollReveal();

  return (
    <section className="flex flex-col md:flex-row md:h-screen w-full">
      <div
        ref={imageReveal.ref}
        className="relative w-full h-[60vh] md:h-full md:w-1/2"
        style={{
          opacity: imageReveal.isVisible ? 1 : 0,
          transform: imageReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
          <source src="/assets/videos/hero.webm" type="video/webm" />
        </video>
      </div>
      <div
        ref={textReveal.ref}
        className="w-full md:h-full md:w-1/2 bg-[#FBF7F0] md:bg-[#181818] py-12 md:py-0 px-6 md:px-12 flex items-center justify-center"
        style={{
          opacity: textReveal.isVisible ? 1 : 0,
          transform: textReveal.isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s",
        }}
      >
        <div className="max-w-2xl">
          <h2 className="font-canela text-[#181818] md:text-[#FBF7F0] text-3xl md:text-5xl lg:text-6xl mb-6">
            Ritualul Poveștilor
          </h2>
          <p className="font-manrope text-[#181818] md:text-[#FBF7F0] text-base md:text-lg lg:text-xl leading-relaxed">
            Dar cele mai frumoase povești se spun la o ceașcă de cafea arabească, cu gust puternic
            și pregnant, uneori intensificat cu cardamon.
          </p>
        </div>
      </div>
    </section>
  );
}

function Chapter5() {
  return (
    <section
      className="relative w-screen h-screen flex items-center justify-center bg-[#FBF7F0]"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="max-w-4xl px-8 text-center">
        <h2 className="font-canela text-[#181818] text-5xl md:text-6xl lg:text-7xl mb-6">
          Vă Așteptăm
        </h2>
        <p className="font-manrope text-[#181818] text-lg md:text-xl lg:text-2xl leading-relaxed mb-12">
          Fie că doriți să luați masa alături de cei dragi, să veniți pentru o întâlnire de
          afaceri sau să organizați o petrecere privată, echipa Al' Zaátar este pregătită să vă
          întâmpine cu drag.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/rezervare"
            className="font-manrope text-[#181818] text-lg font-medium px-8 py-4 bg-[#C99A3F] rounded-sm hover:bg-[#B88A2F] transition-colors duration-300"
          >
            REZERVARE
          </Link>
          <Link
            href="/meniu"
            className="font-manrope text-[#181818] text-lg font-medium px-8 py-4 bg-[#C99A3F] rounded-sm hover:bg-[#B88A2F] transition-colors duration-300"
          >
            VEZI MENIU
          </Link>
        </div>
      </div>
    </section>
  );
}

function Chapter5Vertical() {
  const contentReveal = useScrollReveal();

  return (
    <section
      ref={contentReveal.ref}
      className="relative w-full py-12 md:h-screen md:py-0 flex items-center justify-center bg-[#FBF7F0] px-6 md:px-12"
      style={{
        opacity: contentReveal.isVisible ? 1 : 0,
        transform: contentReveal.isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
      }}
    >
      <div className="max-w-4xl text-center">
        <h2 className="font-canela text-[#181818] text-3xl md:text-5xl lg:text-6xl mb-6">
          Vă Așteptăm
        </h2>
        <p className="font-manrope text-[#181818] text-base md:text-lg lg:text-xl leading-relaxed mb-12">
          Fie că doriți să luați masa alături de cei dragi, să veniți pentru o întâlnire de
          afaceri sau să organizați o petrecere privată, echipa Al' Zaátar este pregătită să vă
          întâmpine cu drag.
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 justify-center">
          <Link
            href="/rezervare"
            className="font-manrope text-[#181818] text-base md:text-lg font-medium px-8 py-4 bg-[#C99A3F] rounded-sm hover:bg-[#B88A2F] transition-colors duration-300 w-full md:w-auto"
          >
            REZERVARE
          </Link>
          <Link
            href="/meniu"
            className="font-manrope text-[#181818] text-base md:text-lg font-medium px-8 py-4 bg-[#C99A3F] rounded-sm hover:bg-[#B88A2F] transition-colors duration-300 w-full md:w-auto"
          >
            VEZI MENIU
          </Link>
        </div>
      </div>
    </section>
  );
}

