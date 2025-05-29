"use client";

export default function BaseModal({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-2xl",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className={`bg-white rounded-md shadow-lg w-full ${maxWidth}`}>
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
