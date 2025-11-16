import React, { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={onClose}
    >
      <div
        className="bg-white"
        style={{
          width: 640,
          height: 530,
          borderRadius: 6,
          boxShadow:
            "0px 16px 32px 0px #1D212D1A, 0px 1px 4px 0px #1D212D26, 0px 0px 1px 0px #1D212D33",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
