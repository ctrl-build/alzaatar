"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, Phone, MapPin, X, ForkKnife } from "phosphor-react";

const MENU_ITEMS = [
  { label: "ACASĂ", href: "/" },
  { label: "POVESTEA", href: "/povestea" },
  { label: "MENIU", href: "/meniu" },
  { label: "GALERIE", href: "/galerie" },
  { label: "CONTACT", href: "/contact" },
];

const MENU_CATEGORIES = {
  column1: [
    { label: "Meniu Mezza Rece", href: "/meniu/mezza-rece" },
    { label: "Meniu Mezza Calda", href: "/meniu/mezza-calda" },
    { label: "Meniu Preparate la cuptor", href: "/meniu/preparate-cuptor" },
  ],
  column2: [
    { label: "Meniu Salate", href: "/meniu/salate" },
    { label: "Meniu Preparate la jar", href: "/meniu/preparate-jar" },
    { label: "Meniu Peste", href: "/meniu/peste" },
    { label: "Meniu Garnituri si sosuri", href: "/meniu/garnituri-sosuri" },
    { label: "Meniu Desert", href: "/meniu/desert" },
  ],
};

export default function Navigation() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"RO" | "EN">("RO");
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === "RO" ? "EN" : "RO");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || (isHomepage && isMegaMenuOpen)
            ? "h-[70px] bg-[#181818] shadow-lg"
            : isHomepage
            ? "h-[100px] bg-gradient-to-b from-[#181818]/80 to-transparent"
            : "h-[100px] bg-[#181818]"
        } hidden lg:block`}
      >
        <div className="container mx-auto h-full px-8 flex items-center justify-between">
          <Link href="/" className="relative h-12 w-auto group">
            <Image
              src="/assets/images/Al-Zaatar-Logo-black.png"
              alt="Al Zaatar"
              width={180}
              height={48}
              className={`h-full w-auto object-contain transition-opacity duration-500 ${
                isScrolled ? "opacity-100" : "opacity-90"
              }`}
              style={{
                WebkitMaskImage: "linear-gradient(to right, black 20%, transparent 20%)",
                maskImage: "linear-gradient(to right, black 20%, transparent 20%)",
              }}
              priority
            />
            <Image
              src="/assets/images/Al-Zaatar-Logo-black.png"
              alt=""
              width={180}
              height={48}
              className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-500 ${
                isScrolled ? "opacity-100" : "opacity-90"
              }`}
              style={{
                filter: "brightness(0) invert(1)",
                WebkitMaskImage: "linear-gradient(to right, transparent 20%, black 20%)",
                maskImage: "linear-gradient(to right, transparent 20%, black 20%)",
              }}
              aria-hidden="true"
            />
          </Link>

          <div className="flex items-center gap-12">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.href}
                className={`relative ${
                  item.label === "MENIU" ? "group" : ""
                }`}
              >
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (item.label === "MENIU") {
                      if (megaMenuTimeoutRef.current) {
                        clearTimeout(megaMenuTimeoutRef.current);
                        megaMenuTimeoutRef.current = null;
                      }
                      setIsMegaMenuOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.label === "MENIU") {
                      megaMenuTimeoutRef.current = setTimeout(() => {
                        setIsMegaMenuOpen(false);
                      }, 400);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className="font-canela text-[#FBF7F0] text-sm font-light tracking-wider hover:text-[#C99A3F] hover:underline hover:decoration-[#C99A3F] transition-all"
                  >
                    {item.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={toggleLanguage}
              className="font-canela text-[#FBF7F0] text-sm font-light tracking-wider group"
            >
              <span
                className={`${
                  language === "RO" ? "" : "opacity-50"
                } transition-all ${
                  language === "EN"
                    ? "group-hover:underline group-hover:decoration-[#C99A3F]"
                    : ""
                }`}
              >
                RO
              </span>
              <span className="mx-2">/</span>
              <span
                className={`${
                  language === "EN" ? "" : "opacity-50"
                } transition-all ${
                  language === "RO"
                    ? "group-hover:underline group-hover:decoration-[#C99A3F]"
                    : ""
                }`}
              >
                EN
              </span>
            </button>
            <Link
              href="/rezervare"
              className={`font-canela text-sm font-medium px-6 py-2.5 rounded-sm transition-all duration-500 ${
                isScrolled
                  ? "bg-[#C99A3F] text-[#181818] hover:bg-[#B88A2F]"
                  : "border border-[#FBF7F0] text-[#FBF7F0] hover:bg-[#FBF7F0]/10"
              }`}
            >
              REZERVARE
            </Link>
          </div>
        </div>

        <div
          className={`absolute top-full left-0 right-0 bg-[#181818] border-t border-[#FBF7F0]/10 overflow-hidden transition-all duration-300 ease-out ${
            isMegaMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          onMouseEnter={() => {
            if (megaMenuTimeoutRef.current) {
              clearTimeout(megaMenuTimeoutRef.current);
              megaMenuTimeoutRef.current = null;
            }
            setIsMegaMenuOpen(true);
          }}
          onMouseLeave={() => {
            megaMenuTimeoutRef.current = setTimeout(() => {
              setIsMegaMenuOpen(false);
            }, 400);
          }}
          >
            <div className="container mx-auto px-8 py-12 grid grid-cols-3 gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="font-canela text-[#C99A3F] text-xs font-medium uppercase tracking-wider mb-2">
                  Appetizers
                </h3>
                {MENU_CATEGORIES.column1.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-canela text-[#FBF7F0] text-sm font-light hover:text-[#C99A3F] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-canela text-[#C99A3F] text-xs font-medium uppercase tracking-wider mb-2">
                  Mains & More
                </h3>
                {MENU_CATEGORIES.column2.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-canela text-[#FBF7F0] text-sm font-light hover:text-[#C99A3F] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-center overflow-hidden rounded-lg">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/assets/images/signature-dish.png"
                    alt="Un preparat semnătură: o farfurie întunecată cu o creație culinară libaneză autentică, decorată cu fire de șofran și prezentată cu măiestrie, reprezentând esența bucătăriei noastre."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>

          </div>
      </nav>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || (isHomepage && isMegaMenuOpen)
            ? "h-[70px] bg-[#181818] shadow-lg"
            : isHomepage
            ? "h-[100px] bg-gradient-to-b from-[#181818]/80 to-transparent"
            : "h-[100px] bg-[#181818]"
        } hidden md:block lg:hidden`}
      >
        <div className="container mx-auto h-full px-8 flex items-center justify-between">
          <Link href="/" className="relative h-12 w-auto group">
            <Image
              src="/assets/images/Al-Zaatar-Logo-black.png"
              alt="Al Zaatar"
              width={180}
              height={48}
              className={`h-full w-auto object-contain transition-opacity duration-500 ${
                isScrolled ? "opacity-100" : "opacity-90"
              }`}
              style={{
                WebkitMaskImage: "linear-gradient(to right, black 20%, transparent 20%)",
                maskImage: "linear-gradient(to right, black 20%, transparent 20%)",
              }}
              priority
            />
            <Image
              src="/assets/images/Al-Zaatar-Logo-black.png"
              alt=""
              width={180}
              height={48}
              className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-500 ${
                isScrolled ? "opacity-100" : "opacity-90"
              }`}
              style={{
                filter: "brightness(0) invert(1)",
                WebkitMaskImage: "linear-gradient(to right, transparent 20%, black 20%)",
                maskImage: "linear-gradient(to right, transparent 20%, black 20%)",
              }}
              aria-hidden="true"
            />
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="font-canela text-[#FBF7F0] text-sm font-light tracking-wider group"
            >
              <span
                className={`${
                  language === "RO" ? "" : "opacity-50"
                } transition-all ${
                  language === "EN"
                    ? "group-hover:underline group-hover:decoration-[#C99A3F]"
                    : ""
                }`}
              >
                RO
              </span>
              <span className="mx-2">/</span>
              <span
                className={`${
                  language === "EN" ? "" : "opacity-50"
                } transition-all ${
                  language === "RO"
                    ? "group-hover:underline group-hover:decoration-[#C99A3F]"
                    : ""
                }`}
              >
                EN
              </span>
            </button>
            <Link
              href="/rezervare"
              className={`font-canela text-sm font-medium px-6 py-2.5 rounded-sm transition-all duration-500 ${
                isScrolled
                  ? "bg-[#C99A3F] text-[#181818] hover:bg-[#B88A2F]"
                  : "bg-[#C99A3F] text-[#181818] hover:bg-[#B88A2F]"
              }`}
            >
              REZERVARE
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X size={24} weight="regular" className="transition-all duration-300" />
              ) : (
                <List size={24} weight="regular" className="transition-all duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#181818] flex items-center justify-between px-4 md:hidden">
        <Link href="/" className="relative">
          <Image
            src="/assets/images/logo-mobile.png"
            alt="Al Zaatar"
            width={512}
            height={512}
            className="h-12 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>
        <Link
          href="/rezervare"
          className="font-canela text-sm font-medium px-4 py-2 bg-[#C99A3F] text-[#181818] rounded-sm"
        >
          REZERVARE
        </Link>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-[#181818] border-t border-[#FBF7F0]/10 flex items-center justify-around px-4 md:hidden">
        <Link
          href="/meniu"
          className="flex flex-col items-center gap-1 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors"
        >
          <ForkKnife size={24} weight="regular" />
          <span className="font-canela text-xs font-light">MENIU</span>
        </Link>

        <a
          href="tel:+40123456789"
          className="flex flex-col items-center gap-1 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors"
        >
          <Phone size={24} weight="regular" />
          <span className="font-canela text-xs font-light">TELEFON</span>
        </a>

        <a
          href="https://maps.google.com/?q=Al+Zaatar+Restaurant"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors"
        >
          <MapPin size={24} weight="regular" />
          <span className="font-canela text-xs font-light">LOCAȚIE</span>
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col items-center gap-1 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors"
        >
          {isMenuOpen ? (
            <X size={24} weight="regular" className="transition-all duration-300" />
          ) : (
            <List size={24} weight="regular" className="transition-all duration-300" />
          )}
          <span className="font-canela text-xs font-light">MENU</span>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[60] bg-[#181818] transition-opacity duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 md:top-8 md:right-8 p-2 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors"
          aria-label="Close menu"
        >
          <X size={32} weight="regular" />
        </button>
        <div className="h-full flex flex-col items-center justify-center gap-8 px-8">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`font-canela text-[#FBF7F0] text-3xl font-light tracking-wider hover:text-[#C99A3F] transition-colors ${
                item.label === "MENIU" ? "hidden md:block" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="absolute bottom-12">
            <button
              onClick={toggleLanguage}
              className="font-canela text-[#FBF7F0] text-lg font-light tracking-wider"
            >
              <span className={language === "RO" ? "text-[#C99A3F]" : ""}>
                RO
              </span>
              <span className="mx-2">/</span>
              <span className={language === "EN" ? "text-[#C99A3F]" : ""}>
                EN
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

