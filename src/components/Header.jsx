import {
	FolderArrowDownIcon,
	TagIcon,
	FolderOpenIcon,
	MagnifyingGlassIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { Circle, Dot, Moon } from "@phosphor-icons/react";
import { cn } from "../util/cn";
import { useState, useEffect } from "react";
import { getItem, removeItem } from "../util/useStorage.js";
import { blast } from "../util/Confetti";
import { format } from "date-fns";
import { useStore } from "../util/useStore";
import Pill from "./Pill";

function Option(props) {
	const active = props.menuOption === props.value;

	return (
		<button
			className={cn(
				"p-2 flex items-baseline gap-2",
				active ? "font-medium" : ""
			)}
			onClick={() => {
				props.setMenuOption(props.value);
				props.setToggleMenu(false);
			}}
		>
			{active && <Circle weight="fill" className="w-2 h-2 fill-slate-blue" />}
			{props.text}
		</button>
	);
}

export default function Header(props) {
	const tasks = useStore((state) => state.tasks);
	const completedTasks = useStore((state) => state.completedTasks);

	let day = format(new Date(), "ccc").toLowerCase();
	let activeTasks = tasks.filter((i) => i.days.includes(day));
	let cLength = completedTasks.length;
	let aLength = activeTasks.length;

	const options = [
		{
			text: "active",
			value: 0,
		},
		{
			text: "view all",
			value: 1,
		},
	];
	const menuOption = props.menuOption,
		setMenuOption = props.setMenuOption;
	const [toggleMenu, setToggleMenu] = useState(false);
	const [darkMode, setDarkMode] = useState(getItem("dark-mode") || false);

	const today = format(new Date(), "d MMM");

	let percent = 0;
	if (aLength > 0) {
		percent = Math.floor((cLength / aLength) * 100);
		if (percent >= 95 && props.showSearch && cLength === aLength) {
			blast();
		}
	}

	useEffect(() => {
		// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		if (darkMode) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}

		removeItem("dark-mode", darkMode);
	}, [darkMode]);

	return (
		<div className="relative flex flex-col items-center gap-3 w-full my-4">
			<div className="flex items-center gap-4 w-full">
				{props.showSearch && (
					<>
						<button
							onClick={() => {
								setDarkMode(!darkMode);
							}}
						>
							<Circle weight="fill" className="w-6 h-6 fill-slate-blue" />
						</button>
						<h1 className="text-3xl font-bold leading-9 mr-auto">
							Today
						</h1>
					</>
				)}

				{/*<button
					className="p-2"
					onClick={() => {
						props.setShowSearch(!props.showSearch);
						props.setSearchText("");
					}}
				>
					{props.showSearch ? (
						<MagnifyingGlassIcon className="w-6 h-6 stroke-black dark:stroke-white" />
					) : (
						<XMarkIcon className="w-6 h-6 stroke-black dark:stroke-white" />
					)}
				</button>*/}

				{/*{!props.showSearch && (
					<input
						className="border-2 border-gray-200 dark:border-gray-800 bg-transparent text-lg w-full rounded-lg p-1 px-4"
						type="text"
						value={props.searchText}
						onChange={(e) => {
							let v = e.target.value;
							props.setSearchText(v);
							props.searchTask(v);
						}}
						placeholder="type here..."
					/>
				)}*/}

				{props.showSearch && (
					<>
						<button
							className="p-2"
							onClick={() => {
								props.setShowTagEditor(true);
							}}
						>
							<TagIcon className="w-6 h-6 stroke-black dark:stroke-white" />
						</button>
					</>
				)}
				<button
					className="p-2"
					onClick={() => {
						setToggleMenu(!toggleMenu);
					}}
				>
					{toggleMenu ? (
						<FolderOpenIcon className="w-6 h-6" />
					) : (
						<FolderArrowDownIcon className="w-6 h-6" />
					)}
				</button>
			</div>

			{props.showSearch ? (
				<div className="flex items-center gap-4 w-full mx-auto">
					<p>{today}</p>
					<div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
						<div
							className="h-full bg-slate-blue dark:bg-white rounded-full transition-all duration-300"
							style={{
								width: (percent || 0) + "%",
							}}
						/>
					</div>
					<p>{cLength || 0} done</p>
				</div>
			) : (
				<p className="mx-auto w-full text-sm">
					Showing {props.tasks.length} tasks
				</p>
			)}

			{toggleMenu && (
				<div className="absolute right-0 z-[1] top-[50%] bg-white dark:bg-gray-900 p-4 px-8 rounded-lg flex flex-col items-right gap-2 shadow-xl dark:shadow-gray-800">
					{options.map((i) => (
						<Option
							key={i.text}
							{...i}
							menuOption={menuOption}
							setMenuOption={setMenuOption}
							setToggleMenu={setToggleMenu}
						/>
					))}
				</div>
			)}
		</div>
	);
}
