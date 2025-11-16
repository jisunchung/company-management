import React from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="border-border-primary h-15 border-b-[0.5px] bg-white px-30">
      <div className="mx-auto flex h-full w-full items-center justify-between px-6">
        {children}
      </div>
    </header>
  );
}
