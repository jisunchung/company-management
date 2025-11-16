import { useCallback } from "react";
import { useSelectedCompaniesStore } from "@/store/selectedCompanies";
import { useShallow } from "zustand/react/shallow";

export function useSelectedCompanies(email: string) {
  const selectedIds = useSelectedCompaniesStore(
    useShallow((s) => s.selectedByEmail[email] ?? [])
  );

  const toggle = useSelectedCompaniesStore((s) => s.toggle);
  const setAll = useSelectedCompaniesStore((s) => s.setAll);
  const clear = useSelectedCompaniesStore((s) => s.clear);

  const toggleSelect = useCallback(
    (id: number) => toggle(email, id),
    [email, toggle]
  );

  const selectAll = useCallback(
    (checked: boolean, allIds: number[]) => {
      if (checked) setAll(email, allIds);
      else clear(email);
    },
    [email, setAll, clear]
  );

  return {
    selectedIds,
    toggleSelect,
    selectAll,
    setAll: (ids: number[]) => setAll(email, ids),
    clear: () => clear(email),
  };
}

export default useSelectedCompanies;
