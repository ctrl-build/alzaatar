"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, CaretLeft, CaretRight } from "phosphor-react";

const GALLERY_IMAGES = [
  { id: 1, src: "/assets/images/galerie/architectura/1DX_7418-1024x683.jpg", category: "arhitectura", alt: "Arhitectură maiestuoasă: arcade ornate și detalii sculptate care creează un cadru specific oriental, cu iluminat cald care evidențiază texturile și modelele autentice libaneze." },
  { id: 2, src: "/assets/images/galerie/architectura/1DX_7460-1024x683.jpg", category: "arhitectura", alt: "Detalii arhitecturale orientale: sculpturi intricate și modele tradiționale care povestesc despre meșteșugul și tradiția bucătăriei libaneze, capturate în fiecare colț al spațiului." },
  { id: 3, src: "/assets/images/galerie/architectura/1DX_7469-1024x683.jpg", category: "arhitectura", alt: "Spațiu de ospitalitate autentică: arhitectură care combină elementele tradiționale orientale cu design modern, creând un mediu cald și primitor în inima Craiovei." },
  { id: 4, src: "/assets/images/galerie/architectura/1DX_7486-1024x683.jpg", category: "arhitectura", alt: "Arcade și felinare orientale: elemente arhitecturale care transportă oaspeții într-un cadru specific oriental, cu iluminat care creează o atmosferă intimă și maiestuoasă." },
  { id: 5, src: "/assets/images/galerie/architectura/1DX_7496-1024x683.jpg", category: "arhitectura", alt: "Design autentic libanez: detalii arhitecturale care reflectă bogăția și eleganța tradiției orientale, transformând spațiul într-un adevărat majlis." },
  { id: 6, src: "/assets/images/galerie/architectura/2019-05-27-1024x768.jpg", category: "arhitectura", alt: "Arhitectură orientală maiestuoasă: elemente decorative tradiționale care creează un cadru specific, unde fiecare detaliu spune o poveste despre ospitalitatea autentică libaneză." },
  { id: 7, src: "/assets/images/galerie/architectura/hero-slider-1024x681.jpg", category: "arhitectura", alt: "Spațiu de dining cu arhitectură orientală: iluminat cald, arcade ornate și detalii sculptate care transformă experiența culinară într-o călătorie culturală autentică." },
  
  { id: 8, src: "/assets/images/galerie/preparate/12-1024x769.jpg", category: "preparate", alt: "Preparat culinar libanez autentic: o creație strălucitoare, prezentată cu măiestrie pe o farfurie întunecată, decorată cu ingrediente proaspete și condimente exotice care povestesc despre tradiția bucătăriei orientale." },
  { id: 9, src: "/assets/images/galerie/preparate/14-1024x769.jpg", category: "preparate", alt: "Preparat tradițional libanez: o farfurie cu preparate gătite cu grijă, prezentate cu atenție la detalii, unde fiecare ingredient spune o poveste despre autenticitate și excelență culinară." },
  { id: 10, src: "/assets/images/galerie/preparate/2019-04-24-1-1024x576.jpg", category: "preparate", alt: "Creație culinară libaneză: preparat strălucitor cu arome exotice, prezentat pe o farfurie întunecată, decorat cu fire de șofran și ingrediente proaspete care evidențiază bogăția bucătăriei orientale." },
  { id: 11, src: "/assets/images/galerie/preparate/2019-04-24-1024x576.jpg", category: "preparate", alt: "Preparat autentic libanez: o farfurie cu preparate tradiționale, gătite după rețete vechi, prezentate cu măiestrie și decorată cu condimente care creează o experiență senzorială completă." },
  { id: 12, src: "/assets/images/galerie/preparate/2019-04-24-2-1024x576.jpg", category: "preparate", alt: "Preparat culinar cu iz oriental: creație strălucitoare pe farfurie întunecată, decorată cu ingrediente proaspete și condimente exotice, reprezentând esența bucătăriei libaneze autentice." },
  { id: 13, src: "/assets/images/galerie/preparate/3.jpg", category: "preparate", alt: "Preparat tradițional libanez: o farfurie cu preparate gătite cu grijă, prezentate cu atenție la detalii, unde fiecare ingredient reflectă tradiția și excelența bucătăriei orientale." },
  { id: 14, src: "/assets/images/galerie/preparate/4-1024x769.jpg", category: "preparate", alt: "Creație culinară autentică: preparat strălucitor cu arome exotice, prezentat pe farfurie întunecată, decorat cu fire de șofran și ingrediente proaspete care povestesc despre meșteșugul bucătăriei libaneze." },
  { id: 15, src: "/assets/images/galerie/preparate/5-1024x769.jpg", category: "preparate", alt: "Preparat libanez tradițional: o farfurie cu preparate gătite după rețete vechi, prezentate cu măiestrie și decorată cu condimente care creează o experiență senzorială autentică orientală." },
  { id: 16, src: "/assets/images/galerie/preparate/7-1024x769.jpg", category: "preparate", alt: "Preparat culinar cu iz oriental: creație strălucitoare pe farfurie întunecată, decorată cu ingrediente proaspete și condimente exotice, reprezentând bogăția și autenticitatea bucătăriei libaneze." },
  
  { id: 17, src: "/assets/images/galerie/ambianta/1DX_7564-1024x683.jpg", category: "ambianta", alt: "Ambianță orientală autentică: spațiu de dining cu iluminat cald creat de felinare orientale, mese pregătite cu grijă și detalii arhitecturale care creează o atmosferă intimă și maiestuoasă." },
  { id: 18, src: "/assets/images/galerie/ambianta/1DX_7592-1024x682.jpg", category: "ambianta", alt: "Spațiu de ospitalitate libaneză: ambianță caldă și primitoare cu iluminat intim, mese aranjate cu atenție și elemente decorative orientale care transformă experiența într-o călătorie culturală." },
  { id: 19, src: "/assets/images/galerie/ambianta/1DX_7596-1024x683.jpg", category: "ambianta", alt: "Ambianță autentică orientală: spațiu de dining cu detalii arhitecturale și decorative care reflectă tradiția libaneză, creând un mediu cald și primitor pentru oaspeți." },
  { id: 20, src: "/assets/images/galerie/ambianta/1DX_7625-1024x683.jpg", category: "ambianta", alt: "Spațiu de ospitalitate cu iz oriental: ambianță intimă creată de iluminat cald, mese pregătite cu măiestrie și elemente decorative autentice care povestesc despre ospitalitatea libaneză." },
  { id: 21, src: "/assets/images/galerie/ambianta/44721810_311984572985500_952928126901010143_n.jpg", category: "ambianta", alt: "Ambianță maiestuoasă orientală: spațiu de dining cu arhitectură autentică, iluminat cald și detalii decorative care creează o experiență completă de ospitalitate libaneză în inima Craiovei." },
];

const FILTERS = [
  { id: "toate", label: "TOATE" },
  { id: "arhitectura", label: "ARHITECTURA" },
  { id: "preparate", label: "PREPARATE" },
  { id: "ambianta", label: "AMBIANȚA" },
];

export default function GaleriePage() {
  const [activeFilter, setActiveFilter] = useState<string>("toate");
  const [filteredImages, setFilteredImages] = useState(GALLERY_IMAGES);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1023);
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    
    setTimeout(() => {
      if (activeFilter === "toate") {
        setFilteredImages(GALLERY_IMAGES);
      } else {
        setFilteredImages(GALLERY_IMAGES.filter((img) => img.category === activeFilter));
      }
      setIsFiltering(false);
    }, 300);
  }, [activeFilter]);

  const openLightbox = (imageId: number) => {
    const image = GALLERY_IMAGES.find((img) => img.id === imageId);
    if (image && (activeFilter === "toate" || image.category === activeFilter)) {
      setLightboxImage(imageId);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxImage === null) return;

    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage);
    let newIndex: number;

    if (direction === "next") {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }

    setLightboxImage(filteredImages[newIndex].id);
  };

  useEffect(() => {
    if (lightboxImage === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxImage, filteredImages]);

  const currentLightboxIndex = lightboxImage
    ? filteredImages.findIndex((img) => img.id === lightboxImage)
    : -1;

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartRef.current === null || touchEndRef.current === null) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && filteredImages.length > 1) {
      navigateLightbox("next");
    }
    if (isRightSwipe && filteredImages.length > 1) {
      navigateLightbox("prev");
    }
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-16 md:pt-0">
      <header
        ref={headerRef}
        className="pt-20 md:pt-32 pb-12 md:pb-16 px-6 md:px-8"
      >
        <div
          className={`max-w-full md:max-w-[720px] mx-auto text-center transition-all duration-1000 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-canela text-[#181818] text-[40px] md:text-6xl lg:text-[64px] font-light mb-8 leading-tight">
            Galeria Noastră
          </h1>
          <p className="font-manrope text-[#181818] text-[17px] md:text-lg lg:text-xl leading-relaxed">
            O Viziune a Ospitalității Orientale
          </p>
        </div>
      </header>

      <div className="bg-[#FBF7F0] px-4 md:px-8 pb-8">
        <div className="container mx-auto max-w-7xl">
          {isMobile ? (
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full bg-[#FBF7F0] border-2 border-[#C99A3F] text-[#181818] font-manrope text-base py-3 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C99A3F]"
            >
              {FILTERS.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.label}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`font-manrope text-base md:text-lg transition-all duration-300 relative pb-2 ${
                    activeFilter === filter.id
                      ? "text-[#181818] font-medium"
                      : "text-[#181818]/60 hover:text-[#181818]"
                  }`}
                >
                  {filter.label}
                  {activeFilter === filter.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C99A3F] transition-all duration-300" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 pb-12 md:pb-20">
        {isMobile ? (
          <div className="space-y-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative w-full aspect-video md:aspect-auto md:h-[400px] rounded-lg overflow-hidden"
              >
                <div 
                  className="relative w-full h-full bg-[#181818]/5 rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(image.id)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-lg"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-[#181818]/0 group-hover:bg-[#181818]/30 transition-all duration-300 flex items-center justify-center pointer-events-none rounded-lg">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#FBF7F0] text-4xl font-light">
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`grid gap-4 md:gap-6 auto-rows-max ${
              isTablet ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {GALLERY_IMAGES.map((image, index) => {
              const isVisible =
                activeFilter === "toate" || image.category === activeFilter;

              const layoutPatterns = [
                { aspect: "aspect-[4/5]", cols: 1 }, // Portrait - tall
                { aspect: "aspect-[3/4]", cols: 1 }, // Portrait - tall
                { aspect: "aspect-square", cols: 1 }, // Square
                { aspect: "aspect-[4/3]", cols: isTablet ? 2 : 2 }, // Landscape - spans 2 cols
                { aspect: "aspect-[5/4]", cols: 1 }, // Slightly landscape
                { aspect: "aspect-[3/2]", cols: isTablet ? 2 : 2 }, // Wide landscape - spans 2 cols
              ];
              const pattern = layoutPatterns[index % layoutPatterns.length];
              const aspectClass = pattern.aspect;
              const colSpan = pattern.cols === 2 ? (isTablet ? "col-span-2" : "col-span-2") : "";

              return (
                <div
                  key={image.id}
                  className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
                    isVisible && !isFiltering ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  } ${colSpan}`}
                  style={{
                    animationDelay: isVisible && !isFiltering ? `${index * 0.05}s` : "0s",
                    display: isVisible || isFiltering ? "block" : "none",
                  }}
                >
                  <div 
                    className={`relative w-full ${aspectClass} bg-[#181818]/5 rounded-lg overflow-hidden group cursor-pointer`}
                    onClick={() => openLightbox(image.id)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-lg"
                      sizes={isTablet ? (pattern.cols === 2 ? "100vw" : "50vw") : (pattern.cols === 2 ? "66vw" : "33vw")}
                    />
                    <div className="absolute inset-0 bg-[#181818]/0 group-hover:bg-[#181818]/30 transition-all duration-300 flex items-center justify-center pointer-events-none rounded-lg">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#FBF7F0] text-5xl md:text-6xl font-light">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {lightboxImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#181818]/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 text-[#FBF7F0] text-3xl md:text-4xl font-light hover:text-[#C99A3F] transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={32} weight="light" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("prev");
                }}
                aria-label="Previous"
              >
                <CaretLeft size={48} weight="light" />
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#FBF7F0] hover:text-[#C99A3F] transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("next");
                }}
                aria-label="Next"
              >
                <CaretRight size={48} weight="light" />
              </button>
            </>
          )}

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={filteredImages[currentLightboxIndex]?.src || ""}
              alt={filteredImages[currentLightboxIndex]?.alt || ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {filteredImages.length > 1 && (
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-[#FBF7F0] font-manrope text-sm md:text-base">
              {currentLightboxIndex + 1} / {filteredImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

