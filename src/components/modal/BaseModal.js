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
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      // Restore body scroll when modal closes
      document.body.style.overflow = "unset";
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-4"
    >
      <div
        className={`bg-white rounded-md shadow-lg w-full ${maxWidth} max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed header with close button */}
        <div className="flex-shrink-0 p-6 pb-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
