"use client";

import { useValueStore } from "@/stores/valueStore";
import { useEffect, useState } from "react";

const Home = () => {
	const valuesStore = useValueStore();

	const [spending, setSpending] = useState<number | null>(null);
	const [saving, setSaving] = useState<number | null>(null);
	const [saved, setSaved] = useState<number | null>(null);

	const [savedColor, setSavedColor] = useState<"black" | "green" | "red">(
		"black",
	);

	useEffect(() => {
		setSpending(valuesStore.income! * (valuesStore.pToSpend / 100));
		setSaving(valuesStore.income! * (valuesStore.pToSave / 100));
		if (valuesStore.actuallySpent) {
			setSaved(
				valuesStore.actuallySpent
					? valuesStore.income! - valuesStore.actuallySpent
					: valuesStore.income!,
			);
		} else {
			setSaved(null);
		}

		if (valuesStore.actuallySpent! < spending!) {
			setSavedColor("green");
		} else if (valuesStore.actuallySpent! > spending!) {
			setSavedColor("red");
		} else {
			setSavedColor("black");
		}
	}, [
		valuesStore.income,
		spending,
		saving,
		valuesStore.actuallySpent,
		saved,
		valuesStore.pToSave,
		valuesStore.pToSpend,
	]);

	return (
		<div className="h-full w-full bg-slate-200">
			<div className="absolute md:top-1/2 md:left-1/2 md:translate-x-[-50%] md:translate-y-[-50%] top-[20px] left-[20px] bottom-[20px] right-[20px] md:bottom-auto md:right-auto px-[30px] py-[30px] bg-slate-100 rounded-2xl flex flex-col gap-[10px]">
				<h1 className="text-xl font-semibold text-center mb-[10px]">
					Artin&apos;s Spending Calculator
				</h1>
				<div>
					<p className="text-xs ml-[10px] text-slate-400">Income</p>
					<input
						className="bg-slate-300 py-[5px] px-[10px] mb-[10px] w-full rounded-md"
						type="number"
						onChange={(e) => {
							valuesStore.setIncome(Number(e.target.value));
							setSpending(valuesStore.income! * (valuesStore.pToSpend / 100));
							setSaving(valuesStore.income! * (valuesStore.pToSave / 100));
						}}
						placeholder="Income"
						defaultValue={valuesStore.income}
					/>
				</div>
				<div className="flex gap-[10px]">
					<div className="w-full">
						<p className="text-xs ml-[10px] text-slate-400">% to spend</p>
						<input
							className="bg-slate-300 py-[5px] px-[10px] mb-[10px] w-full rounded-md"
							type="number"
							onChange={(e) => {
								valuesStore.setPToSpend(Number(e.target.value));
							}}
							placeholder="% To Spend"
							defaultValue={valuesStore.pToSpend}
						/>
					</div>
					<div className="w-full">
						<p className="text-xs ml-[10px] text-slate-400">% to save</p>
						<input
							className="bg-slate-300 py-[5px] px-[10px] mb-[10px] w-full rounded-md"
							type="number"
							onChange={(e) => {
								valuesStore.setPToSave(Number(e.target.value));
							}}
							placeholder="% To Save"
							defaultValue={valuesStore.pToSave}
						/>
					</div>
				</div>
				<div>
					<p className="text-xs ml-[10px] text-slate-400">
						Amount Actually Spent
					</p>
					<input
						className="bg-slate-300 py-[5px] px-[10px] w-full rounded-md"
						type="number"
						onChange={(e) => {
							valuesStore.setActuallySpent(Number(e.target.value));
							setSaved(
								valuesStore.actuallySpent
									? valuesStore.income! - valuesStore.actuallySpent
									: valuesStore.income!,
							);
						}}
						placeholder="Amount Spent"
						defaultValue={valuesStore.actuallySpent}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-[20px] mt-[20px]">
					<div className="bg-slate-200 p-[20px] rounded-xl flex flex-col gap-[10px] min-w-[300px]">
						<h1 className="text-center text-lg font-semibold">Theory</h1>
						<p className="p-[5px] bg-slate-300 rounded-md">
							Spending: ${spending}
						</p>
						<p className="p-[5px] bg-slate-300 rounded-md">Saving: ${saving}</p>
					</div>

					<div className="bg-slate-200 p-[20px] rounded-xl flex flex-col gap-[10px] min-w-[300px]">
						<h1 className="text-center text-lg font-semibold">Reality</h1>
						<div className="p-[5px] bg-slate-300 rounded-md">
							<p
								className={
									savedColor === "black"
										? "text-black"
										: savedColor === "green"
											? "text-green-500"
											: savedColor === "red"
												? "text-red-500"
												: ""
								}
							>
								Spent: ${valuesStore.actuallySpent}
							</p>
						</div>
						<div className="p-[5px] bg-slate-300 rounded-md">
							<p
								className={
									savedColor === "black"
										? "text-black"
										: savedColor === "green"
											? "text-green-500"
											: savedColor === "red"
												? "text-red-500"
												: ""
								}
							>
								Saved: ${saved}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
