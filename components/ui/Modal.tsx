import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import Text from "@/components/ui/Text";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  variant?: "default" | "delete";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  variant = "default",
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

  const isDeleteVariant = variant === "delete";
  const modalWidth = isDeleteVariant ? 400 : 640;
  const modalHeight = isDeleteVariant ? 440 : 530;
  const modalPadding = isDeleteVariant ? 24 : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white"
        style={{
          width: modalWidth,
          height: modalHeight,
          borderRadius: 12,
          padding: modalPadding,
          gap: 32,
          boxShadow:
            "0px 16px 32px 0px #1D212D1A, 0px 1px 4px 0px #1D212D26, 0px 0px 1px 0px #1D212D33",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 우측 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600"
          aria-label="닫기"
        >
          <X width={24} height={24} />
        </button>

        {title && (
          <div
            className={`flex items-center ${isDeleteVariant ? "justify-center pt-6" : "justify-between border-b px-6 py-4"}`}
          >
            <Text typography="t5" bold="bold">
              {title}
            </Text>
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
