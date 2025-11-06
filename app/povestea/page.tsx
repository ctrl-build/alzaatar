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
  const headerRef = useScrollReveal();
  const image1Ref = useScrollReveal();
  const chapter1Ref = useScrollReveal();
  const pullQuoteRef = useScrollReveal();
  const chapter2Ref = useScrollReveal();
  const image2Ref = useScrollReveal();
  const chapter3Ref = useScrollReveal();
  const image3Ref = useScrollReveal();
  const finalRef = useScrollReveal();

  return (
    <article className="bg-[#FBF7F0] min-h-screen">
      <header
        ref={headerRef.ref}
        className="pt-20 md:pt-32 pb-12 md:pb-16 px-6 md:px-8"
      >
        <div
          className={`max-w-full md:max-w-[720px] mx-auto text-center transition-all duration-1000 ${
            headerRef.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-canela text-[#181818] text-[40px] md:text-6xl lg:text-[64px] font-light mb-8 leading-tight">
            Povestea Noastră
          </h1>
          <p className="font-manrope text-[#181818] text-[17px] md:text-lg lg:text-xl leading-relaxed">
            Într-o locație cu arhitectură maiestuoasă, spunem povești cu iz oriental și îți delectăm
            papilele gustative cu preparate delicioase, pline de arome exotice.
          </p>
          <p className="font-manrope text-[#181818] text-[17px] md:text-lg lg:text-xl leading-relaxed mt-6">
            Orientul Mijlociu te așteaptă foarte aproape de Centrul Vechi al Craiovei și la numai
            câțiva pași de Parcul Romanescu.
          </p>
        </div>
      </header>

      <div
        ref={image1Ref.ref}
        className={`w-full h-[60vh] md:h-[80vh] relative mb-16 md:mb-24 transition-all duration-1000 ${
          image1Ref.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0.2s", padding: 0 }}
      >
        <Image
          src="/assets/images/gallery-ambiance.jpg"
          alt="Arhitectură maiestuoasă: arcade ornate, iluminat cald și intim, creând un spațiu de ospitalitate autentică libaneză în inima Craiovei."
          fill
          className="object-cover"
          priority
        />
      </div>

      <section className="px-6 md:px-8 pb-16 md:pb-24">
        <div
          ref={chapter1Ref.ref}
          className={`max-w-full md:max-w-[720px] mx-auto transition-all duration-1000 ${
            chapter1Ref.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <h2 className="font-canela text-[#181818] text-[32px] md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
            Savoarea Orientului
          </h2>

          <div className="font-manrope text-[#181818] text-[17px] md:text-lg leading-relaxed space-y-6">
            <p>
              Carnea de pui, vită sau oaie, servite cu lipie caldă, proaspătă, pregătită în
              bucătăria noastră, te fac să te lingi pe degete datorită ierburilor și mirodeniilor
              speciale pe care le folosim.
            </p>

            <p>
              Nucșoara, chimenul, turmericul, pătrunjelul și menta aduc savoare extra.
            </p>
          </div>
        </div>
      </section>

      <div
        ref={pullQuoteRef.ref}
        className={`w-full py-12 px-6 md:px-0 text-center transition-all duration-1000 ${
          pullQuoteRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0.3s" }}
      >
        <blockquote className="font-canela text-[#C99A3F] text-[24px] md:text-3xl lg:text-[32px] leading-relaxed max-w-full md:max-w-4xl mx-auto">
          Șofranul, cea mai scumpă mirodenie din lume, este responsabil pentru culoare și gust.
        </blockquote>
      </div>

      <section className="px-6 md:px-8 pb-16 md:pb-24">
        <div
          ref={chapter2Ref.ref}
          className={`max-w-full md:max-w-[720px] mx-auto transition-all duration-1000 ${
            chapter2Ref.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <h2 className="font-canela text-[#181818] text-[32px] md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
            Măiestrie din Liban
          </h2>

          <div className="font-manrope text-[#181818] text-[17px] md:text-lg leading-relaxed space-y-6">
            <p>
              Al' Zaátar este un restaurant care dorește să aducă pe meleaguri autohtone atât
              reputația internațională și bogăția de arome îmbietoare ale bucătăriei libaneze cât și
              elementele arhitecturale care creează un cadru specific oriental.
            </p>

            <p>
              Veniți de pe meleaguri orientale, maeștrii bucătari vor prepara mezze-le tradițional
              libaneze folosind ingrediente aduse din Liban, de cea mai bună calitate.
            </p>

            <p>
              Masa tipic libaneză, compusă dintr-o varietate de mezze reci și calde, se completează
              cu delicioasa carne de vită, pui sau miel la grătar, binecunoscutul kebab. Stârnirea
              apetitului poate începe cu un arak, un lichior de anason, băutură tradițional libaneză.
              Din mezza rece, nu pot lipsi homos-ul tradițional, baba-ghanouj-ul și moutabal-ul.
            </p>

            <p>
              Explozia de legume și vitamina C găsită în salatele libaneze Fattoush și Tabouleh
              constituie un izvor de sănătate pentru oaspeții noștri.
            </p>

            <p>
              Varietatea de preparate se adresează atât gurmanzilor cât și vegetarienilor, datorită
              diversității de mezze. Cârnaciorii makanek, ras asfour-ul, cotletele de berbecuț, vită
              și puiul preparate cu condimente speciale libaneze cu siguranță vor fi nelipsite de pe
              mesele oaspeților noștri.
            </p>

            <p>
              Faimoasele Manakish-uri sunt gătite după rețete tradiționale și coapte în cuptoare de
              cărămidă.
            </p>

            <p>
              Prospetimea și delicatețea specifice gastronomiei libaneze vor fi completate de
              delicioasele deserturi kashta, kunafe și kataif cu kashta.
            </p>
          </div>
        </div>
      </section>

      <div
        ref={image2Ref.ref}
        className={`w-full h-[60vh] md:h-[80vh] relative mb-16 md:mb-24 transition-all duration-1000 ${
          image2Ref.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0.2s", padding: 0 }}
      >
        <Image
          src="/assets/images/kunafe.jpg"
          alt="Kunafe: desert tradițional libanez cu brânză dulce și sirop, pregătit cu măiestrie în bucătăria noastră."
          fill
          className="object-cover"
        />
      </div>

      <section className="px-6 md:px-8 pb-16 md:pb-24">
        <div
          ref={chapter3Ref.ref}
          className={`max-w-full md:max-w-[720px] mx-auto transition-all duration-1000 ${
            chapter3Ref.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <h2 className="font-canela text-[#181818] text-[32px] md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
            Ritualul Poveștilor
          </h2>

          <div className="font-manrope text-[#181818] text-[17px] md:text-lg leading-relaxed">
            <p>
              Dar cele mai frumoase povești se spun la o ceașcă de cafea arăbească, cu gust puternic
              și pregnant, uneori intensificat cu cardamon. Te așteptăm pe Calea Unirii 156 să o
              deguști.
            </p>
          </div>
        </div>
      </section>

      <div
        ref={image3Ref.ref}
        className={`w-full h-[60vh] md:h-[80vh] relative mb-16 md:mb-24 transition-all duration-1000 ${
          image3Ref.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0.2s", padding: 0 }}
      >
        <Image
          src="/assets/images/arabic-coffee.jpg"
          alt="Cafea arăbească tradițională cu cardamon: ritualul poveștilor la Al' Zaátar."
          fill
          className="object-cover"
        />
      </div>

      <section className="px-6 md:px-8 pb-20 md:pb-32">
        <div
          ref={finalRef.ref}
          className={`max-w-full md:max-w-[720px] mx-auto text-center transition-all duration-1000 ${
            finalRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <h2 className="font-canela text-[#181818] text-[32px] md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
            O Invitație Deschisă
          </h2>

          <div className="font-manrope text-[#181818] text-[17px] md:text-lg leading-relaxed mb-12">
            <p>
              Fie că doriți să luați masa alături de cei dragi, să veniți pentru o întâlnire de
              afaceri sau să organizați o petrecere privată, echipa Al' Zaátar în frunte cu
              celebrul bucătar Fouad este pregătită să vă întâmpine cu drag.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
            <Link
              href="/rezervare"
              className="font-manrope text-[#181818] text-base md:text-lg font-medium px-8 py-4 bg-[#C99A3F] rounded-sm hover:bg-[#B88A2F] transition-colors duration-300 w-full md:w-auto text-center focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2"
            >
              REZERVARE
            </Link>
            <Link
              href="/meniu"
              className="font-manrope text-[#181818] text-base md:text-lg font-medium px-8 py-4 border-2 border-[#181818] rounded-sm hover:bg-[#181818] hover:text-[#FBF7F0] transition-colors duration-300 w-full md:w-auto text-center focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2"
            >
              VEZI MENIUL
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
