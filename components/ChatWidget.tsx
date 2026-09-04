'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa6';

interface ChatWidgetProps {
  phoneNumber?: string;
  whatsappMessage?: string;
  emailAddress?: string;
  emailSubject?: string;
}

export const ChatWidget = ({
  phoneNumber = '2349161246300',
  whatsappMessage = 'Hello! I have a question about your services.',
  emailAddress = 'contact@wephco.com',
  emailSubject = 'Inquiry via Wephco Website',
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      {/* Mobile/Touch Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Circular Menu Container */}
      <div className="relative z-50 flex items-center justify-center">
        {/* Email Option - Positioned along top-left circular arc (-28px X, -78px Y) */}
        <div
          style={{
            transform: isOpen
              ? 'translate(-28px, -78px) scale(1)'
              : 'translate(0px, 0px) scale(0)',
            opacity: isOpen ? 1 : 0,
            transitionDelay: isOpen ? '40ms' : '0ms',
          }}
          className="absolute flex items-center gap-2 group transition-all duration-300 ease-out pointer-events-auto"
        >
          {/* Label Tooltip */}
          <span
            className={`bg-background-dark/95 text-white border border-wephco/40 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap backdrop-blur-md transition-all duration-200 ${isOpen ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' : 'opacity-0'
              }`}
          >
            Email
          </span>
          <a
            href={mailtoUrl}
            className="w-13 h-13 bg-linear-to-br from-wephco via-[#e5c158] to-[#b38f28] text-background-dark rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-wephco/40 transition-transform duration-200 border-2 border-white/30"
            aria-label="Send an Email"
            title="Send an Email"
            onClick={() => setIsOpen(false)}
          >
            <FaEnvelope className="text-xl text-background-dark" />
          </a>
        </div>

        {/* WhatsApp Option - Positioned along top-left circular arc (-118px X, -28px Y) */}
        <div
          style={{
            transform: isOpen
              ? 'translate(-118px, -28px) scale(1)'
              : 'translate(0px, 0px) scale(0)',
            opacity: isOpen ? 1 : 0,
            transitionDelay: isOpen ? '80ms' : '0ms',
          }}
          className="absolute flex items-center gap-2 group transition-all duration-300 ease-out pointer-events-auto"
        >
          {/* Label Tooltip */}
          <span
            className={`bg-background-dark/95 text-white border border-[#25D366]/40 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap backdrop-blur-md transition-all duration-200 ${isOpen ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' : 'opacity-0'
              }`}
          >
            WhatsApp
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-13 h-13 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-[#25D366]/40 transition-transform duration-200 border-2 border-white/30"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            onClick={() => setIsOpen(false)}
          >
            <FaWhatsapp className="text-2xl text-white" />
          </a>
        </div>

        {/* Main Trigger Button with Chat Icon */}
        <button
          onClick={toggleMenu}
          className={`relative w-15 h-15 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 cursor-pointer ${isOpen
              ? 'bg-[#012417] text-wephco border-2 border-wephco rotate-90 scale-105 shadow-wephco/20'
              : 'bg-linear-to-r from-wephco via-[#e5c158] to-[#b38f28] text-background-dark hover:scale-110 hover:shadow-wephco/40 border-2 border-white/30'
            }`}
          aria-label={isOpen ? 'Close chat menu' : 'Open contact options'}
          aria-expanded={isOpen}
        >
          {/* Subtle pulse animation when menu is closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-wephco animate-ping opacity-20 pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-7 h-7 transition-transform duration-300" />
          ) : (
            <MessageCircle className="w-7 h-7 transition-transform duration-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
