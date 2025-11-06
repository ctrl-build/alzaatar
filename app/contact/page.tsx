"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Clock, Phone, Envelope } from "phosphor-react";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"rezervare" | "mesaj">("rezervare");
  const [isMobile, setIsMobile] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);

  const [reservationForm, setReservationForm] = useState({
    nume: "",
    telefon: "",
    email: "",
    data: "",
    ora: "",
    oaspeti: "",
  });

  const [messageForm, setMessageForm] = useState({
    nume: "",
    email: "",
    subiect: "",
    mesaj: "",
  });

  const [reservationErrors, setReservationErrors] = useState<Record<string, string>>({});
  const [messageErrors, setMessageErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validateReservation = () => {
    const errors: Record<string, string> = {};
    
    if (!reservationForm.nume.trim()) {
      errors.nume = "Vă rugăm să introduceți numele dvs.";
    }
    
    if (!reservationForm.telefon.trim()) {
      errors.telefon = "Vă rugăm să introduceți numărul de telefon.";
    } else if (!/^[0-9+\s()-]+$/.test(reservationForm.telefon)) {
      errors.telefon = "Vă rugăm să introduceți un număr de telefon valid.";
    }
    
    if (!reservationForm.email.trim()) {
      errors.email = "Vă rugăm să introduceți adresa de email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservationForm.email)) {
      errors.email = "Vă rugăm să introduceți o adresă de email validă.";
    }
    
    if (!reservationForm.data) {
      errors.data = "Vă rugăm să selectați data.";
    }
    
    if (!reservationForm.ora) {
      errors.ora = "Vă rugăm să selectați ora.";
    }
    
    if (!reservationForm.oaspeti) {
      errors.oaspeti = "Vă rugăm să introduceți numărul de oaspeți.";
    } else if (parseInt(reservationForm.oaspeti) < 1 || parseInt(reservationForm.oaspeti) > 20) {
      errors.oaspeti = "Numărul de oaspeți trebuie să fie între 1 și 20.";
    }
    
    return errors;
  };

  const validateMessage = () => {
    const errors: Record<string, string> = {};
    
    if (!messageForm.nume.trim()) {
      errors.nume = "Vă rugăm să introduceți numele dvs.";
    }
    
    if (!messageForm.email.trim()) {
      errors.email = "Vă rugăm să introduceți adresa de email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageForm.email)) {
      errors.email = "Vă rugăm să introduceți o adresă de email validă.";
    }
    
    if (!messageForm.subiect.trim()) {
      errors.subiect = "Vă rugăm să introduceți subiectul mesajului.";
    }
    
    if (!messageForm.mesaj.trim()) {
      errors.mesaj = "Vă rugăm să introduceți mesajul dvs.";
    }
    
    return errors;
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateReservation();
    
    if (Object.keys(errors).length === 0) {
      setReservationErrors({});
      console.log("Reservation submitted:", reservationForm);
    } else {
      setReservationErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const field = document.getElementById(firstErrorField);
      if (field) {
        field.focus();
      }
    }
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateMessage();
    
    if (Object.keys(errors).length === 0) {
      setMessageErrors({});
      console.log("Message submitted:", messageForm);
    } else {
      setMessageErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const field = document.getElementById(`mesaj-${firstErrorField}`);
      if (field) {
        field.focus();
      }
    }
  };

  const handleMapClick = () => {
    setIsMapActive(true);
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
            Contact & Rezervări
          </h1>
          <p className="font-manrope text-[#181818] text-[17px] md:text-lg lg:text-xl leading-relaxed">
            Un loc pregătit pentru oaspeți.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="order-1 lg:order-1">
            <div className="flex border-b border-[#181818]/20 mb-8" role="tablist" aria-label="Formular contact">
              <button
                onClick={() => setActiveTab("rezervare")}
                role="tab"
                aria-selected={activeTab === "rezervare"}
                aria-controls="rezervare-panel"
                id="rezervare-tab"
                className={`flex-1 py-4 px-6 font-manrope text-base md:text-lg font-medium transition-colors focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2 ${
                  activeTab === "rezervare"
                    ? "text-[#C99A3F] border-b-2 border-[#C99A3F]"
                    : "text-[#181818]/50 hover:text-[#181818]"
                }`}
              >
                Rezervare
              </button>
              <button
                onClick={() => setActiveTab("mesaj")}
                role="tab"
                aria-selected={activeTab === "mesaj"}
                aria-controls="mesaj-panel"
                id="mesaj-tab"
                className={`flex-1 py-4 px-6 font-manrope text-base md:text-lg font-medium transition-colors focus:outline-2 focus:outline-[#C99A3F] focus:outline-offset-2 ${
                  activeTab === "mesaj"
                    ? "text-[#C99A3F] border-b-2 border-[#C99A3F]"
                    : "text-[#181818]/50 hover:text-[#181818]"
                }`}
              >
                Trimite un Mesaj
              </button>
            </div>

            {activeTab === "rezervare" && (
              <form onSubmit={handleReservationSubmit} className="space-y-6" role="tabpanel" id="rezervare-panel" aria-labelledby="rezervare-tab">
                <div>
                  <label htmlFor="nume" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Numele Dvs.
                  </label>
                  <input
                    type="text"
                    id="nume"
                    value={reservationForm.nume}
                    onChange={(e) => {
                      setReservationForm({ ...reservationForm, nume: e.target.value });
                      if (reservationErrors.nume) {
                        setReservationErrors({ ...reservationErrors, nume: "" });
                      }
                    }}
                    aria-invalid={!!reservationErrors.nume}
                    aria-describedby={reservationErrors.nume ? "nume-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                      reservationErrors.nume
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {reservationErrors.nume && (
                    <p id="nume-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {reservationErrors.nume}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefon" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    value={reservationForm.telefon}
                    onChange={(e) => {
                      setReservationForm({ ...reservationForm, telefon: e.target.value });
                      if (reservationErrors.telefon) {
                        setReservationErrors({ ...reservationErrors, telefon: "" });
                      }
                    }}
                    aria-invalid={!!reservationErrors.telefon}
                    aria-describedby={reservationErrors.telefon ? "telefon-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                      reservationErrors.telefon
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {reservationErrors.telefon && (
                    <p id="telefon-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {reservationErrors.telefon}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={reservationForm.email}
                    onChange={(e) => {
                      setReservationForm({ ...reservationForm, email: e.target.value });
                      if (reservationErrors.email) {
                        setReservationErrors({ ...reservationErrors, email: "" });
                      }
                    }}
                    aria-invalid={!!reservationErrors.email}
                    aria-describedby={reservationErrors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                      reservationErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {reservationErrors.email && (
                    <p id="email-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {reservationErrors.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="data" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      id="data"
                      value={reservationForm.data}
                      onChange={(e) => {
                        setReservationForm({ ...reservationForm, data: e.target.value });
                        if (reservationErrors.data) {
                          setReservationErrors({ ...reservationErrors, data: "" });
                        }
                      }}
                      aria-invalid={!!reservationErrors.data}
                      aria-describedby={reservationErrors.data ? "data-error" : undefined}
                      className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                        reservationErrors.data
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#181818]/20 focus:border-[#C99A3F]"
                      }`}
                      required
                    />
                    {reservationErrors.data && (
                      <p id="data-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                        {reservationErrors.data}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ora" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                      Ora
                    </label>
                    <select
                      id="ora"
                      value={reservationForm.ora}
                      onChange={(e) => {
                        setReservationForm({ ...reservationForm, ora: e.target.value });
                        if (reservationErrors.ora) {
                          setReservationErrors({ ...reservationErrors, ora: "" });
                        }
                      }}
                      aria-invalid={!!reservationErrors.ora}
                      aria-describedby={reservationErrors.ora ? "ora-error" : undefined}
                      className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                        reservationErrors.ora
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#181818]/20 focus:border-[#C99A3F]"
                      }`}
                      required
                    >
                      <option value="">Selectați ora</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                      <option value="15:00">15:00</option>
                      <option value="15:30">15:30</option>
                      <option value="16:00">16:00</option>
                      <option value="16:30">16:30</option>
                      <option value="17:00">17:00</option>
                      <option value="17:30">17:30</option>
                      <option value="18:00">18:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00</option>
                      <option value="22:30">22:30</option>
                    </select>
                    {reservationErrors.ora && (
                      <p id="ora-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                        {reservationErrors.ora}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="oaspeti" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Număr Oaspeți
                  </label>
                  <input
                    type="number"
                    id="oaspeti"
                    min="1"
                    max="20"
                    value={reservationForm.oaspeti}
                    onChange={(e) => {
                      setReservationForm({ ...reservationForm, oaspeti: e.target.value });
                      if (reservationErrors.oaspeti) {
                        setReservationErrors({ ...reservationErrors, oaspeti: "" });
                      }
                    }}
                    aria-invalid={!!reservationErrors.oaspeti}
                    aria-describedby={reservationErrors.oaspeti ? "oaspeti-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                      reservationErrors.oaspeti
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {reservationErrors.oaspeti && (
                    <p id="oaspeti-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {reservationErrors.oaspeti}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C99A3F] text-[#181818] font-manrope font-medium text-base md:text-lg py-4 px-8 rounded-sm hover:bg-[#B88A2F] transition-colors"
                >
                  TRIMITE REZERVAREA
                </button>
              </form>
            )}

            {activeTab === "mesaj" && (
              <form onSubmit={handleMessageSubmit} className="space-y-6" role="tabpanel" id="mesaj-panel" aria-labelledby="mesaj-tab">
                <div>
                  <label htmlFor="mesaj-nume" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Numele Dvs.
                  </label>
                  <input
                    type="text"
                    id="mesaj-nume"
                    value={messageForm.nume}
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, nume: e.target.value });
                      if (messageErrors.nume) {
                        setMessageErrors({ ...messageErrors, nume: "" });
                      }
                    }}
                    aria-invalid={!!messageErrors.nume}
                    aria-describedby={messageErrors.nume ? "mesaj-nume-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                      messageErrors.nume
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {messageErrors.nume && (
                    <p id="mesaj-nume-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {messageErrors.nume}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="mesaj-email" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="mesaj-email"
                    value={messageForm.email}
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, email: e.target.value });
                      if (messageErrors.email) {
                        setMessageErrors({ ...messageErrors, email: "" });
                      }
                    }}
                    aria-invalid={!!messageErrors.email}
                    aria-describedby={messageErrors.email ? "mesaj-email-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                      messageErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {messageErrors.email && (
                    <p id="mesaj-email-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {messageErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subiect" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Subiect
                  </label>
                  <input
                    type="text"
                    id="subiect"
                    value={messageForm.subiect}
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, subiect: e.target.value });
                      if (messageErrors.subiect) {
                        setMessageErrors({ ...messageErrors, subiect: "" });
                      }
                    }}
                    aria-invalid={!!messageErrors.subiect}
                    aria-describedby={messageErrors.subiect ? "subiect-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors ${
                      messageErrors.subiect
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {messageErrors.subiect && (
                    <p id="subiect-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {messageErrors.subiect}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="mesaj" className="block font-manrope text-[#181818] text-sm md:text-base mb-2">
                    Mesajul Dvs.
                  </label>
                  <textarea
                    id="mesaj"
                    rows={6}
                    value={messageForm.mesaj}
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, mesaj: e.target.value });
                      if (messageErrors.mesaj) {
                        setMessageErrors({ ...messageErrors, mesaj: "" });
                      }
                    }}
                    aria-invalid={!!messageErrors.mesaj}
                    aria-describedby={messageErrors.mesaj ? "mesaj-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-sm bg-[#FBF7F0] font-manrope text-[#181818] focus:outline-none transition-colors resize-none ${
                      messageErrors.mesaj
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#181818]/20 focus:border-[#C99A3F]"
                    }`}
                    required
                  />
                  {messageErrors.mesaj && (
                    <p id="mesaj-error" role="alert" className="mt-2 font-manrope text-sm text-red-600">
                      {messageErrors.mesaj}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C99A3F] text-[#181818] font-manrope font-medium text-base md:text-lg py-4 px-8 rounded-sm hover:bg-[#B88A2F] transition-colors"
                >
                  TRIMITE MESAJUL
                </button>
              </form>
            )}
          </div>

          <div className="order-2 lg:order-2">
            <h3 className="font-canela text-[#181818] text-3xl md:text-4xl mb-8">
              Unde Ne Găsiți
            </h3>

            <div className="mb-8">
              <div className="flex items-start gap-3 mb-2">
                <MapPin className="text-[#C99A3F] text-xl md:text-2xl mt-1 flex-shrink-0" weight="fill" />
                <div>
                  <p className="font-manrope text-[#181818] text-base md:text-lg font-medium">
                    Calea Unirii, nr. 156, Craiova
                  </p>
                  <p className="font-manrope text-[#181818]/60 text-sm md:text-base mt-1">
                    Lângă Centrul Vechi și Parcul Romanescu.
                  </p>
                </div>
              </div>
              <Link
                href="https://www.google.com/maps?q=Calea+Unirii+156,+Craiova,+Romania"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-manrope text-[#181818] text-sm md:text-base font-medium hover:text-[#C99A3F] transition-colors relative group"
              >
                OBȚINE DIRECȚII →
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99A3F] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="text-[#C99A3F] text-xl md:text-2xl" weight="fill" />
                <a
                  href="tel:+40799149848"
                  className="font-manrope text-[#181818] text-base md:text-lg font-medium hover:text-[#C99A3F] transition-colors relative group"
                >
                  (0799) 149 848
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99A3F] transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Envelope className="text-[#C99A3F] text-xl md:text-2xl" weight="fill" />
                <a
                  href="mailto:rezervari@alzaatar.ro"
                  className="font-manrope text-[#181818] text-base md:text-lg font-medium hover:text-[#C99A3F] transition-colors relative group"
                >
                  rezervari@alzaatar.ro
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C99A3F] transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-3">
                <Clock className="text-[#C99A3F] text-xl md:text-2xl mt-1 flex-shrink-0" weight="fill" />
                <div>
                  <p className="font-manrope text-[#181818] text-base md:text-lg font-medium">
                    Luni – Duminică: 12:00 – 23:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                {!isMapActive ? (
                  <div
                    onClick={handleMapClick}
                    className="absolute inset-0 bg-[#181818] cursor-pointer flex items-center justify-center z-10 transition-opacity duration-300 hover:opacity-90"
                  >
                    <div className="text-center px-8">
                      <p className="font-manrope text-[#FBF7F0] text-base md:text-lg mb-2">
                        Click to activate map
                      </p>
                      <div className="w-16 h-16 mx-auto border-2 border-[#C99A3F] rounded-full flex items-center justify-center">
                        <MapPin className="text-[#C99A3F] text-2xl" weight="fill" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#181818] via-[#1a1a1a] to-[#181818] opacity-50" />
                  </div>
                ) : null}
                <iframe
                  src="https://www.google.com/maps?q=Calea+Unirii+156,+Craiova,+Romania&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(100%) invert(92%) hue-rotate(180deg) brightness(0.8) contrast(1.2)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={isMapActive ? "" : "pointer-events-none"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

