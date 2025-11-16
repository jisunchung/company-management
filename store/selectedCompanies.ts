import { create } from "zustand";

interface SelectedCompaniesState {
  selectedByEmail: Record<string, number[]>;
  toggle: (email: string, id: number) => void;
  setAll: (email: string, ids: number[]) => void;
  clear: (email: string) => void;
}

export const useSelectedCompaniesStore = create<SelectedCompaniesState>(
  (set) => ({
    selectedByEmail: {},
    toggle: (email: string, id: number) =>
      set((state) => {
        const prev = state.selectedByEmail[email] ?? [];
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        return {
          selectedByEmail: { ...state.selectedByEmail, [email]: next },
        };
      }),
    setAll: (email: string, ids: number[]) =>
      set((state) => ({
        selectedByEmail: { ...state.selectedByEmail, [email]: ids },
      })),
    clear: (email: string) =>
      set((state) => {
        const copy = { ...state.selectedByEmail };
        delete copy[email];
        return { selectedByEmail: copy };
      }),
  })
);
