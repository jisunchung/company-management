import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SearchableDropdownProps {
  label: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
}

export default function SearchableDropdown({
  label,
  placeholder = "검색",
  options,
  value,
  onChange,
  onSearch,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // value가 변경되면 searchQuery도 업데이트
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 검색어로 필터링
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setSearchQuery(option);
    setIsOpen(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setIsOpen(true);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="text"
          style={{ width: 600 }}
          className="rounded border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-[#FFB27F] focus:outline-none"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            width={20}
            height={20}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          className="absolute z-10 mt-20 rounded border border-gray-300 bg-white shadow-lg"
          style={{ width: 600 }}
        >
          <div className="max-h-60 overflow-y-auto p-2">
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                style={{
                  width: 584,
                  height: 40,
                  borderRadius: 4,
                }}
                className="flex items-center px-3 py-4 text-left transition-colors hover:bg-[#FFB27F]"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
