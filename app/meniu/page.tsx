"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera } from "phosphor-react";

const MENU_CATEGORIES = [
  { id: "mezza-rece", label: "Meniu Mezza Rece" },
  { id: "mezza-calda", label: "Meniu Mezza Calda" },
  { id: "preparate-cuptor", label: "Meniu Preparate la cuptor" },
  { id: "supe", label: "Supe" },
  { id: "salate", label: "Meniu Salate" },
  { id: "preparate-jar", label: "Meniu Preparate la jar" },
  { id: "peste", label: "Meniu Peste" },
  { id: "garnituri", label: "Meniu Garnituri si sosuri" },
  { id: "desert", label: "Meniu Desert" },
];

const MENU_ITEMS: Record<string, Array<{
  name: string;
  nameEn?: string;
  price: string;
  descriptionRo: string;
  descriptionEn: string;
  details?: string;
  hasPhoto?: boolean;
  photoSrc?: string;
}>> = {
  "mezza-rece": [
    {
      name: "BEIRUTY",
      price: "24 RON",
      descriptionRo: "Homos cu usturoi, patrunjel si pasta picanta",
      descriptionEn: "Homos with garlic, parsley and chili peppers",
      details: "(215g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-rece/beiruty.png",
    },
    {
      name: "MOUTABAL",
      price: "28 RON",
      descriptionRo: "Salata de vinete coapte cu pasta de susan",
      descriptionEn: "Baked aubergine with sesame paste",
      details: "(235g)",
    },
    {
      name: "RODIE",
      price: "28 RON",
      descriptionRo: "Homos cu boabe de rodie",
      descriptionEn: "Homos with pomegranate",
      details: "(240g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-rece/rodie.png",
    },
    {
      name: "BABA-GHANOUJ",
      price: "32 RON",
      descriptionRo: "Pasta de vinete coapte cu legume crude si rodie",
      descriptionEn: "Baked aubergine with veggie and pomegranate",
      details: "(295g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-rece/baba-ghanouj.png",
    },
    {
      name: "CARNE VITA SI SNUBAR",
      price: "36 RON",
      descriptionRo: "Homos cu bucatele de carne de vita si muguri de pin",
      descriptionEn: "Homos with beef and pine nuts",
      details: "(255g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-rece/carne-snubar.png",
    },
    {
      name: "WARAK INAB",
      price: "32 RON",
      descriptionRo: "Sarmalute in foi de vita, umplute cu orez si pasta de rodie",
      descriptionEn: "Wine leaves stuffed with rice and pomegranate sauce",
      details: "(170g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-rece/warak.png",
    },
    {
      name: "USTUROI SI MENTA",
      price: "24 RON",
      descriptionRo: "Lebneh cu usturoi si menta uscata",
      descriptionEn: "Lebneh with garlic and dry mint",
      details: "(185g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-rece/labneh.png",
    },
    {
      name: "MIX MEZZA",
      price: "58 RON",
      descriptionRo: "Homos, beiruty, moutabal, baba-ghanouj, lebneh",
      descriptionEn: "Homos, beiruty, moutabal, baba-ghanouj, lebneh",
      details: "(400g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-rece/mix-mezza.png",
    },
  ],
  "mezza-calda": [
    {
      name: "SAMBUSEK CU BRANZA",
      price: "28 RON",
      descriptionRo: "Foietaj cu branza si menta",
      descriptionEn: "Pastry with cheese and mint",
      details: "(100g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/sambusek-branza.png",
    },
    {
      name: "MAKANEK",
      price: "44 RON",
      descriptionRo: "Carnaciori libanezi cu lamaie si rodie",
      descriptionEn: "Lebanese sausages with lemon and pomegranate",
      details: "(90g)",
    },
    {
      name: "SAMUSEK CU CARNE",
      price: "30 RON",
      descriptionRo: "Foietaj cu carne tocata si ceapa",
      descriptionEn: "Pastry with minced meat and onion",
      details: "(100g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/sambusek-carne.png",
    },
    {
      name: "CRISPY",
      price: "48 RON",
      descriptionRo: "Piept de pui, fulgi de porumb",
      descriptionEn: "Chicken breast, cornflakes",
      details: "(150g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/crispy.png",
    },
    {
      name: "FALAFEL",
      price: "34 RON",
      descriptionRo: "Naut, ceapa, coriandru si usturoi",
      descriptionEn: "Chickpeas, onion, coriander and garlic",
      details: "(160g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/falafel.png",
    },
    {
      name: "SHAORMA SHUKRAN PUI",
      price: "46 RON",
      descriptionRo: "Carne de pui feliata cu ceapa, legume crude si condimente",
      descriptionEn: "Sliced chicken meat with onion, fresh veggie and spices",
      details: "(180g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/shawarma-pui.png",
    },
    {
      name: "BATATA HARRA",
      price: "34 RON",
      descriptionRo: "Cartofi cu usturoi, pasta picanta si coriandru",
      descriptionEn: "Garlic potatoes, spicy paste and coriander",
      details: "(280g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/batata-harra.png",
    },
    {
      name: "RAS ASFOUR DE PUI",
      price: "46 RON",
      descriptionRo: "Cubulete de piept de pui in ulei de masline, felii de ceapa si sos de rodii.",
      descriptionEn: "Tender chicken in olive oil, onion slices and pomegranate sauce",
      details: "(320g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/ras-pui.png",
    },
    {
      name: "KIBBEH",
      price: "36 RON",
      descriptionRo: "Carne tocata de vita cu grau fin si muguri de pin",
      descriptionEn: "Minced beef with crushed wheat and pine nuts",
      details: "(300g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/kibbeh.png",
    },
    {
      name: "SHAORMA SHUKRAN VITA",
      price: "50 RON",
      descriptionRo: "Carne de vita felitata cu ceapa, legume crude si condimente",
      descriptionEn: "Sliced beef with onion, fresh veggie and spices",
      details: "(180g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/shawarma-vita.png",
    },
    {
      name: "HALOUMI",
      price: "40 RON",
      descriptionRo: "Branza Haloumi la gratar",
      descriptionEn: "Grilled Haloumi cheese",
      details: "(170g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/halloumi.png",
    },
    {
      name: "RAS ASFOUR DE VITA",
      price: "58 RON",
      descriptionRo: "Cubulete de vita in ulei de masline, felii de ceapa si sos de rodii",
      descriptionEn: "Tender beef in olive oil, onion slices and pomegranate sauce",
      details: "(280g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/mezza-calda/ras-vita.png",
    },
  ],
  "preparate-cuptor": [
    {
      name: "PAINEA CASEI",
      price: "8 RON",
      descriptionRo: "Paine traditionala libaneza",
      descriptionEn: "Traditional lebanese bread",
      details: "(90g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/preparate-cuptor/paine-casei.png",
    },
    {
      name: "PAINE ZA'ATAR",
      price: "18 RON",
      descriptionRo: "Paine cu busuioc, ulei de masline, susan negru si alb",
      descriptionEn: "Bread with basil, olive oil, black and white sesame",
      details: "(220g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/preparate-cuptor/paine-zaatar.png",
    },
    {
      name: "MANNAKISH CU BRANZA",
      price: "32 RON",
      descriptionRo: "Aluat cu branza si menta",
      descriptionEn: "Dough with cheese and mint",
      details: "(260g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/preparate-cuptor/mannakish-branza.png",
    },
    {
      name: "MOHAMARA",
      price: "32 RON",
      descriptionRo: "Aluat cu pasta de ardei, ceapa si susan negru si alb",
      descriptionEn: "Dough with chilli paste, onion and black and white sesame",
      details: "(260g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/preparate-cuptor/mohamara.png",
    },
    {
      name: "MANAKISH SANCLIS",
      price: "38 RON",
      descriptionRo: "Aluat cu branza Sanclis si legume",
      descriptionEn: "Dough with Sanclis cheese and veggie",
      details: "(230g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/preparate-cuptor/sanclis.png",
    },
    {
      name: "MANAKISH CU CARNE",
      price: "42 RON",
      descriptionRo: "Aluat cu carne tocata de vita, rosii si ceapa",
      descriptionEn: "Dough with minced beef, tomatoes and onion",
      details: "(310g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/preparate-cuptor/mannakish-carne.png",
    },
    {
      name: "MANAKISH MOZARELLA SI SUJUC",
      price: "42 RON",
      descriptionRo: "Aluat cu mozarella si carne Sujuc",
      descriptionEn: "Dough with mozarella and Sujuc beef",
      details: "(370g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/preparate-cuptor/mannakish-sujoc.png",
    },
  ],
  "supe": [
    {
      name: "SUPA CREMA DE LINTE",
      price: "26 RON",
      descriptionRo: "supa crema de linte servita cu lamaie si crutoane",
      descriptionEn: "lentil cream soup served with lemon and toast",
      details: "(350g)",
    },
  ],
  "salate": [
    {
      name: "SALATA LIBANEZA",
      price: "30 RON",
      descriptionRo: "Rosii, castraveti, salata verde, menta si lamaie",
      descriptionEn: "Green olives with mint and spices",
      details: "(220g)",
    },
    {
      name: "SALATA TABOULEH",
      price: "32 RON",
      descriptionRo: "Patrunjel, lamaie si rosii",
      descriptionEn: "Parsley, lemon and tomatoes",
      details: "(235g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/salate/tabbouleh.png",
    },
    {
      name: "SALATA DE MASLINE CU LEGUME",
      price: "40 RON",
      descriptionRo: "Masline, rosii, ceapa, patrunjel si lamaie",
      descriptionEn: "Olives, tomatos, onion, parsley and lemon",
      details: "(340g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/salate/salata-mas.png",
    },
    {
      name: "SALATA FATTOUSH CU HALOUMI",
      price: "40 RON",
      descriptionRo: "Salata Fattoush cu branza Haloumi",
      descriptionEn: "Fattoush salad with Haloumi cheese",
      details: "(425g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/salate/fattoush.png",
    },
  ],
  "preparate-jar": [
    {
      name: "ARAYES",
      price: "36 RON",
      descriptionRo: "Lipie umpluta cu carne tocata de vita, ceapa si patrunjel",
      descriptionEn: "Pita bread filled with minced beef, onion and parsley",
      details: "(160g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/arayes.png",
    },
    {
      name: "ARAYES CU MOZARELLA",
      price: "40 RON",
      descriptionRo: "Lipie umpluta cu carne tocata de vita, ceapa patrunjel si mozarella",
      descriptionEn: "Pita bread filled with minced beef, onion and parsley and mozarella",
      details: "(170g)",
    },
    {
      name: "ARAYES CU RODIE",
      price: "40 RON",
      descriptionRo: "Lipie umpluta cu carne tocata de vita, ceapa patrunjel si rodie",
      descriptionEn: "Pita bread filled with minced beef, onion and parsley and pomegranate",
      details: "(170g)",
    },
    {
      name: "SIS-TAUK",
      price: "56 RON",
      descriptionRo: "Frigarui de pui",
      descriptionEn: "Grilled cubes of chicken breast",
      details: "(230g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/tauk.png",
    },
    {
      name: "ARIPIOARE LA JAR",
      price: "56 RON",
      descriptionRo: "Aripioare de pui la gratar cu orez",
      descriptionEn: "Chicken wings with rice",
      details: "(220g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/arip-la-jar.png",
    },
    {
      name: "KAFTA",
      price: "58 RON",
      descriptionRo: "Carne tocata de vita si berbecut",
      descriptionEn: "Mixed lamb and beef",
      details: "(205g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/kafta.png",
    },
    {
      name: "ADANA KEBAB",
      price: "60 RON",
      descriptionRo: "Kebab picant de vita",
      descriptionEn: "Spicy beef kebab",
      details: "(215g)",
    },
    {
      name: "KAFTA CU MOZARELLA",
      price: "60 RON",
      descriptionRo: "Carne tocata de vita si berbecut cu mozarella",
      descriptionEn: "Mixed lamb and beef with mozarella",
      details: "(235g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/kafta-mozarella.png",
    },
    {
      name: "PUI LA JAR DEZOSAT",
      price: "74 RON",
      descriptionRo: "Pui la jar dezosat",
      descriptionEn: "Grilled boneless chicken",
      details: "(440g)",
    },
    {
      name: "LAHME MESHWIA",
      price: "84 RON",
      descriptionRo: "Frigarui de vita",
      descriptionEn: "Grilled beef cubes",
      details: "(150g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/lahme.png",
    },
    {
      name: "COTLET DE BERBECUT",
      price: "90 RON",
      descriptionRo: "Cotlet de berbecut",
      descriptionEn: "Lamb chops",
      details: "(210g)",
    },
    {
      name: "MIX ZA'ATAR",
      price: "120 RON",
      descriptionRo: "Carnaciori libanezi, pui, kafta, cotlet de berbecut si aripioare de pui",
      descriptionEn: "Lebanese sausages, chicken, kafta, lamb chops and chicken wings",
      details: "(650g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/mix.png",
    },
    {
      name: "MIEL A LA HABBIBI",
      price: "140 RON / KG",
      descriptionRo: "Miel intreg la cuptor, orez, migdale, rodii, patrunjel. (15 – 25 kg)",
      descriptionEn: "Whole lamb in the oven, rice, almonds, pomegranates, parsley. (15 – 25 kg)",
      details: "(Precomanda 48h)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/la-jar/miel.png",
    },
  ],
  "peste": [
    {
      name: "CALAMARI LIBANEZI",
      price: "44 RON",
      descriptionRo: "Calamari cu sos de usturoi, lamaie, chimen si menta",
      descriptionEn: "Calamari with garlic sauce, lemon, caraway and mint",
      details: "(180g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/peste/calamri.png",
    },
    {
      name: "CREVETI LIBANEZI",
      price: "50 RON",
      descriptionRo: "Creveti cu sos de usturoi, lamaie, chimen si menta",
      descriptionEn: "Shrimps with garlic sauce, lemon, caraway and mint",
      details: "(180g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/peste/creveti.png",
    },
    {
      name: "DORADA LA GRATAR",
      price: "66 RON",
      descriptionRo: "Dorada la gratar",
      descriptionEn: "Grilled bream",
      details: "(300g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/peste/dorada.png",
    },
    {
      name: "SOMON LA GRATAR",
      price: "68 RON",
      descriptionRo: "Somon la gratar",
      descriptionEn: "Grilled salmon",
      details: "(200g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/peste/somon.png",
    },
  ],
  "garnituri": [
    {
      name: "CARTOFI PRAJITI",
      price: "18 RON",
      descriptionRo: "Cartofi prajiti",
      descriptionEn: "French fries",
      details: "(200g)",
    },
    {
      name: "OREZ BASMATI",
      price: "28 RON",
      descriptionRo: "Orez basmati",
      descriptionEn: "Basmati rice",
      details: "(300g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/granituri-sos/orez.png",
    },
    {
      name: "LEGUME LA GRATAR",
      price: "28 RON",
      descriptionRo: "Legume la gratar",
      descriptionEn: "Grilled vegetables",
      details: "(150g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/granituri-sos/legume-la-gratar.png",
    },
    {
      name: "SOS TAHINA",
      price: "8 RON",
      descriptionRo: "Sos tahina",
      descriptionEn: "Tahini sauce",
      details: "(30g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/granituri-sos/sosori.png",
    },
    {
      name: "SOS USTUROI",
      price: "8 RON",
      descriptionRo: "Sos usturoi",
      descriptionEn: "Garlic sauce",
      details: "(30g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/granituri-sos/sosori-2.png",
    },
    {
      name: "SOS IUTE",
      price: "8 RON",
      descriptionRo: "Sos iute",
      descriptionEn: "Spicy sauce",
      details: "(30g)",
    },
    {
      name: "SOS ROSII",
      price: "8 RON",
      descriptionRo: "Sos rosii",
      descriptionEn: "Tomato sauce",
      details: "(30g)",
    },
    {
      name: "SOS FRESH",
      price: "8 RON",
      descriptionRo: "Sos fresh",
      descriptionEn: "Fresh sauce",
      details: "(30g)",
    },
    {
      name: "SOS RODIE",
      price: "10 RON",
      descriptionRo: "Sos rodie",
      descriptionEn: "Pomegranate sauce",
      details: "(30g)",
    },
  ],
  "desert": [
    {
      name: "KASHTA",
      price: "32 RON",
      descriptionRo: "Crema de lapte cu esenta de flori de trandafiri, banane, miere, fistic",
      descriptionEn: "Milk cream with rose water, banana, honey and pistachio",
      details: "(250g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/desert/kashta.png",
    },
    {
      name: "KATAIF CU KASHTA",
      price: "34 RON",
      descriptionRo: "Aluat de coca speciala cu umplutura de kashta",
      descriptionEn: "Special dough filled with kashta",
      details: "(180g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/desert/kataif-kashta.png",
    },
    {
      name: "KATAIF CU NUCA",
      price: "36 RON",
      descriptionRo: "Aluat de coca speciala cu umplutura de nuca si scortisoara",
      descriptionEn: "Special dough filled with nuts and cinnamon",
      details: "(180g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/desert/kataif-nuca.png",
    },
    {
      name: "KUNAFE",
      price: "38 RON",
      descriptionRo: "Fidea libaneza cu branza dulce, sirop de miere si fistic",
      descriptionEn: "Lebanese pastry filled with sweet cheese, honey and pistachio",
      details: "(235g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/desert/kunafe.png",
    },
    {
      name: "INGHETATA HOMEMADE",
      price: "38 RON",
      descriptionRo: "Inghetata de casa cu lapte si fistic",
      descriptionEn: "Homemade ice-cream with milk and pistachio",
      details: "(150g)",
      hasPhoto: true,
      photoSrc: "/assets/images/meniu/desert/ice-cream.png",
    },
  ],
};

export default function MeniuPage({ preSelectedCategory }: { preSelectedCategory?: string }) {
  const [initialCategory, setInitialCategory] = useState<string>(() => {
    if (preSelectedCategory) return preSelectedCategory;
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash && MENU_CATEGORIES.some((cat) => cat.id === hash)) {
        return hash;
      }
    }
    return "mezza-rece";
  });

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(initialCategory);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; item: typeof MENU_ITEMS[string][0] } | null>(null);
  const [hasPreScrolled, setHasPreScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxImage]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (!isMobile) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + 200;

        for (const category of MENU_CATEGORIES) {
          const element = sectionRefs.current[category.id];
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveCategory(category.id);
              break;
            }
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  useEffect(() => {
    if (initialCategory !== "mezza-rece" && !isMobile && !hasPreScrolled) {
      const timer = setTimeout(() => {
        const element = sectionRefs.current[initialCategory];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveCategory(initialCategory);
          setHasPreScrolled(true);
        }
      }, 300); // Delay to ensure DOM is ready and page is loaded

      return () => clearTimeout(timer);
    }
  }, [initialCategory, isMobile, hasPreScrolled]);

  const scrollToCategory = (categoryId: string) => {
    const element = sectionRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(categoryId);
    }
  };

  const toggleAccordion = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-16 md:pt-0">
      <div className="bg-[#FBF7F0] py-12 md:py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <h1 className="font-canela text-[#181818] text-4xl md:text-5xl lg:text-6xl mb-4 text-center">
            Meniul Nostru
          </h1>
          <h2 className="font-manrope text-[#181818]/70 text-xl md:text-2xl mb-6 text-center">
            Arome Autentice Libaneze
          </h2>
          <p className="font-manrope text-[#181818] text-base md:text-lg text-center max-w-3xl mx-auto leading-relaxed">
            Explorați o varietate de mezze reci și calde, preparate la jar și deserturi gătite cu
            ingrediente proaspete, aduse din Liban.
          </p>
        </div>
      </div>

      {!isMobile ? (
        <div className="flex min-h-screen">
          <aside className="w-1/4 bg-[#181818] sticky top-0 h-screen overflow-y-auto scrollbar-hide">
            <div className="p-6 md:p-8">
              <nav className="space-y-2">
                {MENU_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`w-full text-left font-manrope text-sm md:text-base py-3 px-4 transition-all duration-300 ${
                      activeCategory === category.id
                        ? "text-[#C99A3F] border-l-2 border-[#C99A3F] pl-6"
                        : "text-[#FBF7F0]/70 hover:text-[#C99A3F] hover:pl-6"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-[#FBF7F0]/20">
                <a
                  href="#"
                  className="block font-manrope text-[#FBF7F0]/50 text-xs md:text-sm py-2 hover:text-[#C99A3F] transition-colors"
                >
                  vezi și Meniu Kcal
                </a>
                <a
                  href="#"
                  className="block font-manrope text-[#FBF7F0]/50 text-xs md:text-sm py-2 hover:text-[#C99A3F] transition-colors"
                >
                  vezi și Meniu Oasim
                </a>
              </div>
            </div>
          </aside>

          <main className="w-3/4 px-4 md:px-8 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">
              {MENU_CATEGORIES.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(el) => {
                    sectionRefs.current[category.id] = el;
                  }}
                  className="mb-16 md:mb-24"
                >
                  <h2 className="font-canela text-[#181818] text-3xl md:text-4xl lg:text-5xl mb-4">
                    {category.label.replace("Meniu ", "")}
                  </h2>
                  <p className="font-manrope text-[#181818]/70 text-base md:text-lg mb-8">
                    Selecție autentică de preparate tradiționale libaneze.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {MENU_ITEMS[category.id]?.map((item, index) => (
                      <MenuItemCard
                        key={index}
                        item={item}
                        onPhotoClick={() => item.hasPhoto && item.photoSrc && setLightboxImage({ src: item.photoSrc, item })}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      ) : (
        <div className="px-4 pb-20">
          <div className="max-w-2xl mx-auto">
            {MENU_CATEGORIES.map((category) => (
              <div key={category.id} className="mb-4">
                <button
                  onClick={() => toggleAccordion(category.id)}
                  aria-expanded={expandedCategory === category.id}
                  aria-controls={`menu-accordion-${category.id}`}
                  aria-label={`${expandedCategory === category.id ? "Închide" : "Deschide"} ${category.label}`}
                  className="w-full bg-[#181818] text-[#FBF7F0] font-manrope text-base font-medium py-4 px-6 flex items-center justify-between hover:bg-[#181818]/90 transition-colors focus:outline-2 focus:outline-[#FBF7F0] focus:outline-offset-2"
                >
                  <span>{category.label}</span>
                  <span className={`transition-transform duration-300 ${expandedCategory === category.id ? "rotate-180" : ""}`} aria-hidden="true">
                    ▼
                  </span>
                </button>
                {expandedCategory === category.id && (
                  <div id={`menu-accordion-${category.id}`} className="bg-[#FBF7F0] p-6 space-y-6" role="region" aria-labelledby={`menu-button-${category.id}`}>
                    {MENU_ITEMS[category.id]?.map((item, index) => (
                      <MenuItemCard
                        key={index}
                        item={item}
                        isMobile={true}
                        onPhotoClick={() => item.hasPhoto && item.photoSrc && setLightboxImage({ src: item.photoSrc, item })}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-8 pt-8 border-t border-[#181818]/20">
              <a
                href="#"
                className="block font-manrope text-[#181818]/50 text-sm py-2 hover:text-[#C99A3F] transition-colors"
              >
                vezi și Meniu Kcal
              </a>
              <a
                href="#"
                className="block font-manrope text-[#181818]/50 text-sm py-2 hover:text-[#C99A3F] transition-colors"
              >
                vezi și Meniu Oasim
              </a>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#181818]/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Vizualizare preparat: ${lightboxImage.item.name}`}
        >
          <button
            className="absolute top-4 right-4 text-[#FBF7F0] text-2xl font-light hover:text-[#C99A3F] transition-colors focus:outline-2 focus:outline-[#FBF7F0] focus:outline-offset-2"
            onClick={() => setLightboxImage(null)}
            aria-label="Închide lightbox"
          >
            ×
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage.src}
              alt={`${lightboxImage.item.name}: ${lightboxImage.item.descriptionRo}. ${lightboxImage.item.descriptionEn}. ${lightboxImage.item.details ? lightboxImage.item.details : ""}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItemCard({
  item,
  isMobile = false,
  onPhotoClick,
}: {
  item: {
    name: string;
    nameEn?: string;
    price: string;
    descriptionRo: string;
    descriptionEn: string;
    details?: string;
    hasPhoto?: boolean;
  };
  isMobile?: boolean;
  onPhotoClick: () => void;
}) {
  return (
    <div className="border-b border-[#181818]/10 pb-6 last:border-0">
      <div className={`flex items-start justify-between mb-2 ${isMobile ? "flex-col" : ""}`}>
        <div className="flex items-center gap-2">
          <h3 className="font-canela text-[#181818] text-xl md:text-2xl">
            {item.name}
          </h3>
          {item.hasPhoto && (
            <button
              onClick={onPhotoClick}
              className="text-[#C99A3F] hover:text-[#B88A2F] transition-colors"
              aria-label={`Vezi fotografie ${item.name}`}
            >
              <Camera size={20} weight="regular" />
            </button>
          )}
        </div>
        <span className={`font-canela text-[#181818] text-xl md:text-2xl ${isMobile ? "mt-2" : ""}`}>
          {item.price}
        </span>
      </div>

      <div className="mb-2">
        <p className="font-manrope text-[#181818] text-sm md:text-base italic">
          {item.descriptionRo}
        </p>
        <p className="font-manrope text-[#181818]/70 text-sm md:text-base italic">
          {item.descriptionEn}
        </p>
      </div>

      {item.details && (
        <p className="font-manrope text-[#181818]/60 text-xs">
          {item.details}
        </p>
      )}
    </div>
  );
}

