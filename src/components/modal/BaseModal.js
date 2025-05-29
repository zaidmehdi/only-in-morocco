"use client";

import { useEffect, useRef } from "react";

export default function BaseModal({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-2xl",
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleClickOutside = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
    >
      <div
        className={`bg-white rounded-md shadow-lg w-full ${maxWidth}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
