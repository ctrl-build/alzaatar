"use client";

import Link from "next/link";
import Image from "next/image";
import { FacebookLogo, InstagramLogo } from "phosphor-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#181818] border-t border-[#C99A3F] pb-20 md:pb-0">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-3 order-1">
            <Link href="/" className="relative h-10 md:h-12 w-auto inline-block mb-4 group">
              <Image
                src="/assets/images/Al-Zaatar-Logo-black.png"
                alt="Al Zaatar"
                width={180}
                height={48}
                className="h-full w-auto object-contain opacity-90"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, black 20%, transparent 20%)",
                  maskImage: "linear-gradient(to right, black 20%, transparent 20%)",
                }}
              />
              <Image
                src="/assets/images/Al-Zaatar-Logo-black.png"
                alt=""
                width={180}
                height={48}
                className="absolute inset-0 h-full w-auto object-contain opacity-90"
                style={{
                  filter: "brightness(0) invert(1)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 20%, black 20%)",
                  maskImage: "linear-gradient(to right, transparent 20%, black 20%)",
                }}
              />
            </Link>
            <p className="font-manrope text-[#FBF7F0]/70 text-sm md:text-base mb-6 leading-relaxed">
              Povești cu iz oriental, din inima Craiovei.
            </p>
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FBF7F0] hover:text-[#C99A3F] transition-colors duration-300"
                aria-label="Facebook"
              >
                <FacebookLogo size={24} weight="regular" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FBF7F0] hover:text-[#C99A3F] transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramLogo size={24} weight="regular" />
              </a>
              <a
                href="https://www.tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FBF7F0] hover:text-[#C99A3F] transition-colors duration-300"
                aria-label="TripAdvisor"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hover:fill-[#C99A3F] transition-all duration-300"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 order-5 md:order-2 lg:order-2">
            <h4 className="font-manrope text-[#FBF7F0] text-sm uppercase tracking-wider mb-4">
              NAVIGAȚIE
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base"
              >
                Acasă
              </Link>
              <Link
                href="/povestea"
                className="font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base"
              >
                Povestea
              </Link>
              <Link
                href="/meniu"
                className="font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base"
              >
                Meniu
              </Link>
              <Link
                href="/galerie"
                className="font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base"
              >
                Galerie
              </Link>
              <Link
                href="/contact"
                className="font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base"
              >
                Contact
              </Link>
              <Link
                href="/rezervare"
                className="font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base"
              >
                Rezervare
              </Link>
            </nav>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 order-2 md:order-3 lg:order-3">
            <h4 className="font-manrope text-[#FBF7F0] text-sm uppercase tracking-wider mb-4">
              CONTACTAȚI-NE
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Calea+Unirii+156,+Craiova"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-block font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base relative pb-1 w-fit"
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                  Calea Unirii, nr. 156, Craiova
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
              </Link>
              <Link
                href="tel:+40799149848"
                className="group/link inline-block font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base relative pb-1 w-fit"
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                  (0799) 149 848
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
              </Link>
              <Link
                href="mailto:contact@alzaatar.ro"
                className="font-manrope text-[#FBF7F0]/70 hover:text-[#C99A3F] transition-colors duration-300 text-sm md:text-base break-all"
              >
                contact@alzaatar.ro
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 order-3 md:order-4 lg:order-4">
            <h4 className="font-manrope text-[#FBF7F0] text-sm uppercase tracking-wider mb-4">
              ORE
            </h4>
            <div className="flex flex-col gap-2 mb-6">
              <p className="font-manrope text-[#FBF7F0]/70 text-sm md:text-base">
                Luni – Duminică
              </p>
              <p className="font-manrope text-[#FBF7F0]/70 text-sm md:text-base">
                12:00 – 23:00
              </p>
            </div>
            <Link
              href="/rezervare"
              className="group/link inline-block font-manrope text-[#C99A3F] text-sm md:text-base font-medium relative pb-1"
            >
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5">
                REZERVARE →
              </span>
              <span className="absolute bottom-0 left-0 h-[2px] bg-[#C99A3F] w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
            </Link>
          </div>

          <div className="col-span-12 md:hidden order-4 flex items-center gap-4 mt-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FBF7F0] hover:text-[#C99A3F] transition-colors duration-300"
              aria-label="Facebook"
            >
              <FacebookLogo size={24} weight="regular" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FBF7F0] hover:text-[#C99A3F] transition-colors duration-300"
              aria-label="Instagram"
            >
              <InstagramLogo size={24} weight="regular" />
            </a>
            <a
              href="https://www.tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FBF7F0] hover:text-[#C99A3F] transition-colors duration-300"
              aria-label="TripAdvisor"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hover:fill-[#C99A3F] transition-all duration-300"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-[#181818]/50 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="text-center md:text-left">
              <p className="font-manrope text-[#FBF7F0]/50 text-xs md:text-sm">
                © {currentYear} Al' Zaátar Craiova.
              </p>
              <p className="font-manrope text-[#FBF7F0]/50 text-xs md:text-sm">
                Toate drepturile rezervate.
              </p>
              <p className="font-manrope text-[#FBF7F0]/50 text-xs md:text-sm mt-2">
                Designed and developed by{" "}
                <a
                  href="https://ctrl-build.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C99A3F] transition-colors duration-300"
                >
                  CTRL+BUILD
                </a>
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right">
              <Link
                href="/politica-confidentialitate"
                className="font-manrope text-[#FBF7F0]/50 hover:text-[#C99A3F] transition-colors duration-300 text-xs md:text-sm"
              >
                Politică de Confidențialitate
              </Link>
              <span className="hidden md:inline text-[#FBF7F0]/50">|</span>
              <Link
                href="/termeni-conditii"
                className="font-manrope text-[#FBF7F0]/50 hover:text-[#C99A3F] transition-colors duration-300 text-xs md:text-sm"
              >
                Termeni și Condiții
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

