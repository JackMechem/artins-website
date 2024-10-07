"use client";

import { useEffect, useState } from "react";

const Home = () => {
	const [income, setIncome] = useState<number | null>(null);
	const [spending, setSpending] = useState<number | null>(null);
	const [saving, setSaving] = useState<number | null>(null);
	const [spent, setSpent] = useState<number | null>(null);
	const [saved, setSaved] = useState<number | null>(null);

	const [savedColor, setSavedColor] = useState<"black" | "green" | "red">(
		"black",
	);

	const [perToSave, setPerToSave] = useState<number>(40);
	const [perToSpend, setPerToSpend] = useState<number>(60);

	useEffect(() => {
		setSpending(income! * (perToSpend / 100));
		setSaving(income! * (perToSave / 100));
		if (spent) {
			setSaved(spent ? income! - spent : income!);
		} else {
			setSaved(null);
		}

		if (spent! < spending!) {
			setSavedColor("green");
		} else if (spent! > spending!) {
			setSavedColor("red");
		} else {
			setSavedColor("black");
		}
	}, [income, spending, saving, spent, saved, perToSave, perToSpend]);

	return (
		<div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-[30px] py-[30px] bg-slate-100 rounded-2xl flex flex-col gap-[10px]">
			<h1 className="text-xl font-semibold text-center mb-[10px]">
				Artin&apos;s Website
			</h1>
			<div>
				<p className="text-xs ml-[10px] text-slate-400">Income</p>
				<input
					className="bg-slate-300 py-[5px] px-[10px] mb-[10px] w-full rounded-md"
					type="number"
					onChange={(e) => {
						setIncome(Number(e.target.value));
						setSpending(income! * (perToSpend / 100));
						setSaving(income! * (perToSave / 100));
					}}
					placeholder="Income"
				/>
			</div>
			<div className="flex gap-[10px]">
				<div className="w-full">
					<p className="text-xs ml-[10px] text-slate-400">% to spend</p>
					<input
						className="bg-slate-300 py-[5px] px-[10px] mb-[10px] w-full rounded-md"
						type="number"
						onChange={(e) => {
							setPerToSpend(Number(e.target.value));
						}}
						placeholder="% To Spend"
						defaultValue={60}
					/>
				</div>
				<div className="w-full">
					<p className="text-xs ml-[10px] text-slate-400">% to save</p>
					<input
						className="bg-slate-300 py-[5px] px-[10px] mb-[10px] w-full rounded-md"
						type="number"
						onChange={(e) => {
							setPerToSave(Number(e.target.value));
						}}
						placeholder="% To Save"
						defaultValue={40}
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
						setSpent(Number(e.target.value));
						setSaved(spent ? income! - spent : income!);
					}}
					placeholder="Amount Spent"
				/>
			</div>
			<div className="flex gap-[20px] mt-[20px]">
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
							Spent: ${spent}
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
	);
};

export default Home;
