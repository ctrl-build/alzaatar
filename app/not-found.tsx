"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBF7F0] flex items-center justify-center py-20 md:py-32">
      <div className="container mx-auto max-w-4xl text-center px-6 md:px-8">
        <p className="font-manrope text-[#A95B42] text-base uppercase tracking-wider mb-6">
          404
        </p>

        <h1 className="font-canela text-[#181818] text-5xl md:text-6xl lg:text-[64px] mb-6">
          O Cale Greșită?
        </h1>

        <p className="font-manrope text-[#181818] text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ lineHeight: "1.6" }}>
          Ne cerem scuze. Pagina pe care o căutați s-a rătăcit printre arome sau nu mai există. Vă putem ajuta să vă reorientați.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6">
          <Link
            href="/"
            className="w-full md:w-auto bg-[#C99A3F] text-[#181818] font-manrope font-medium text-base md:text-lg py-4 px-8 rounded-sm hover:bg-[#B88A2F] transition-colors"
          >
            ÎNAPOI ACASĂ
          </Link>

          <Link
            href="/meniu"
            className="w-full md:w-auto border-2 border-[#181818] text-[#181818] font-manrope font-medium text-base md:text-lg py-4 px-8 rounded-sm hover:bg-[#181818] hover:text-[#FBF7F0] transition-colors mt-4 md:mt-0"
          >
            VEZI MENIUL
          </Link>

          <Link
            href="/rezervare"
            className="w-full md:w-auto border-2 border-[#181818] text-[#181818] font-manrope font-medium text-base md:text-lg py-4 px-8 rounded-sm hover:bg-[#181818] hover:text-[#FBF7F0] transition-colors mt-4 md:mt-0"
          >
            REZERVARE
          </Link>
        </div>
      </div>
    </div>
  );
}

