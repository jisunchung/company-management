import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { XCircle } from "lucide-react";
import { MODAL } from "@/constants";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" variant="delete">
      <div className="mt-8 flex flex-col items-center justify-center gap-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FAC7CE]">
          <XCircle className="h-9 w-9 text-[#9C1613]" />
        </div>
        <div className="flex flex-col text-center">
          <Text typography="t4" bold="bold" className="mb-4">
            {MODAL.DELETE.TITLE}
          </Text>
          <Text typography="t6">{MODAL.DELETE.SUBTITLE}</Text>
          <Text typography="t6">{MODAL.DELETE.SUBTITLE2}</Text>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Button variant="Fill" onClick={onConfirm} style={{ width: "100%" }}>
            {MODAL.DELETE.DELETE_BUTTON}
          </Button>
          <Button variant="Outline" onClick={onClose} style={{ width: "100%" }}>
            {MODAL.DELETE.CANCEL_BUTTON}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
