import {
	FolderArrowDownIcon,
	TagIcon,
	WalletIcon,
	MagnifyingGlassIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { Circle, Dot } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { blast } from "../util/Confetti";
import { format } from "date-fns";
import { useStore } from "../util/useStore";
import { twMerge } from "tailwind-merge";
import Pill from "./Pill";

function Option(props) {
	const active = props.menuOption === props.value;

	return (
		<button
			className={twMerge(
				"p-2 flex items-baseline gap-2",
				active ? "font-medium" : "",
			)}
			onClick={() => {
				props.setMenuOption(props.value);
				props.setToggleMenu(false);
			}}
		>
			{active && (
				<Circle weight="fill" className="w-2 h-2 fill-slate-blue" />
			)}
			{props.text}
		</button>
	);
}

export default function Header(props) {
	const tasks = useStore((state) => state.tasks);
	const completedTasks = useStore((state) => state.completedTasks);
	const removeCompletedTask = useStore((state) => state.removeCompletedTask);
	const clearSelectedTasks = useStore((state) => state.clearSelectedTasks);

	let day = format(new Date(), "ccc").toLowerCase();
	let activeTasks = tasks.filter((i) => i.days.includes(day));
	let cLength = completedTasks.length;
	let aLength = activeTasks.length;

	if (cLength > aLength) {
		completedTasks.filter(
			(id) =>
				!(activeTasks.length > 1 &&
				activeTasks.includes((task) => task.id === id))
		).forEach(id => removeCompletedTask(id));
	}

	const menuOption = props.menuOption,
		setMenuOption = props.setMenuOption;

	const today = format(new Date(), "d MMM");

	const [isBlasted, setIsBlasted] = useState(false);

	let percent = 0;
	if (aLength > 0) {
		percent = Math.floor((cLength / aLength) * 100);
		if (percent >= 95 && props.showSearch && cLength === aLength && !isBlasted) {
			blast();
			setIsBlasted(true);
		}
	}

	const d = useStore((state) => state.darkMode);
	const setD = useStore((state) => state.setDarkMode);
	const [darkMode, setDarkMode] = useState(d);

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<div className="relative flex flex-col items-center gap-3 w-full my-4">
			<div className="flex items-center gap-4 w-full">
				<button
					onClick={() => {
						let value = !darkMode;
						setDarkMode(value);
						setD(value);
					}}
				>
					<Circle weight="fill" className="w-6 h-6 fill-slate-blue" />
				</button>
				<h1 className="text-3xl font-bold leading-9 mr-auto">Today</h1>
				<button
					className="p-2 relative"
					onClick={() => {
						setMenuOption((prev) => (prev + 1) % 2);
						clearSelectedTasks()
					}}
				>
					<WalletIcon className="w-6 h-6 dark:fill-neutral-800" />
					{Boolean(menuOption) && (
						<Circle
							weight="fill"
							className="absolute top-0 right-0 w-3 h-3 fill-slate-blue -translate-x-1/2 translate-y-1/2"
						/>
					)}
				</button>
			</div>

			<div className="flex items-center gap-4 w-full mx-auto">
				<p>{today}</p>
				<div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
					<div
						className="h-full bg-slate-blue rounded-full transition-all duration-300"
						style={{
							width: (percent || 0) + "%",
						}}
					/>
				</div>
				<p>{cLength || 0} done</p>
			</div>
		</div>
	);
}
