import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ValuesState = {
	income: number;
	pToSpend: number;
	pToSave: number;
	actuallySpent: number;
	setIncome: (val: number) => void;
	setPToSpend: (val: number) => void;
	setPToSave: (val: number) => void;
	setActuallySpent: (val: number) => void;
};

export const useValueStore = create(
	persist<ValuesState>(
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
			setPToSpend: (val: number) =>
				set({
					income: get().income,
					pToSpend: val,
					pToSave: get().pToSave,
					actuallySpent: get().actuallySpent,
				}),
			setPToSave: (val: number) =>
				set({
					income: get().income,
					pToSpend: get().pToSpend,
					pToSave: val,
					actuallySpent: get().actuallySpent,
				}),
			setActuallySpent: (val: number) =>
				set({
					income: get().income,
					pToSpend: get().pToSpend,
					pToSave: get().pToSave,
					actuallySpent: val,
				}),
		}),
		{
			name: "values",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
