import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useValueStore = create(
	persist(
		(set, get) => ({
			income: 0,
			pToSpend: 60,
			pToSave: 40,
			actuallySpent: 0,
			setIncome: (val: number) =>
				set({
					income: val,
					pToSpend: get().pToSpend,
					pToSave: get().pToSave,
					actuallySpent: get().actuallySpent,
				}),
		}),
		{
			name: "values",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
