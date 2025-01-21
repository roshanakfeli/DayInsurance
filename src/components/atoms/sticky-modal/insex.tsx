import React from "react";

interface StickyBottomModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const StickyBottomModal: React.FC<StickyBottomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 transition-opacity  ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={` scroll overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/90 rounded-t-2xl py-5 shadow-lg shadow-gray-400/50 transition-transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ minHeight: "30vh", maxHeight: "70vh" }}
      >
        <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

        <div className="flex flex-col items-center justify-start h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default StickyBottomModal;
