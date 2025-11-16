import React from "react";
import Modal from "@/components/ui/Modal";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import Button from "@/components/ui/Button";
import { MODAL } from "@/constants";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyOptions: string[];
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
  memo: string;
  onMemoChange: (value: string) => void;
  onSave: () => void;
  isPending: boolean;
}

export default function CreateCompanyModal({
  isOpen,
  onClose,
  companyOptions,
  selectedCompany,
  onCompanyChange,
  memo,
  onMemoChange,
  onSave,
  isPending,
}: CreateCompanyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={MODAL.ADD.TITLE}>
      <div className="flex flex-col gap-4">
        <SearchableDropdown
          label={MODAL.ADD.SUBTITLE}
          placeholder={MODAL.ADD.SEARCH_PLACEHOLDER}
          options={companyOptions}
          value={selectedCompany}
          onChange={onCompanyChange}
        />
        <div className="flex flex-col gap-2">
          <textarea
            className="resize-none overflow-y-auto rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder={MODAL.ADD.MEMO_PLACEHOLDER}
            style={{
              width: 600,
              height: 282,
              borderRadius: 6,
              borderWidth: 1,
            }}
            value={memo}
            onChange={(e) => onMemoChange(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="Fill" onClick={onSave} disabled={isPending}>
            {isPending ? MODAL.ADD.CONFIRM_PENDING : MODAL.ADD.CONFIRM_BUTTON}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
