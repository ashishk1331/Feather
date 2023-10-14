import { CheckIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Circle } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Pill from "../components/Pill";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../util/useStore";
import { format } from "date-fns";

export default function Task(props) {
	let createdAt = format(new Date(props.createdAt), "d MMM");

	const completedTasks = useStore((state) => state.completedTasks);
	const selectedTasks = useStore((state) => state.selectedTasks);
	const setSelectedTasks = useStore((state) => state.setSelectedTasks);

	const addCompletedTask = useStore((state) => state.addCompletedTask);
	const removeCompletedTask = useStore((state) => state.removeCompletedTask);

	const [finished, setFinished] = useState(completedTasks.includes(props.id));
	const [selected, setSelected] = useState(selectedTasks.includes(props.id));

	useEffect(() => {
		setSelected(selectedTasks.includes(props.id));
	}, [selectedTasks]);

	return (
		<motion.li
			layoutId={props.id}
			className={twMerge(
				"relative flex items-center gap-2 w-full justify-between p-3 border-2 rounded-lg my-4 bg-white dark:bg-zinc-900",
				selected
					? "border-black dark:border-white"
					: "dark:border-gray-800",
			)}
		>
			{props.menuOption === 0 && (
				<div
					className={twMerge(
						"w-7 min-w-7 min-h-7 h-7 aspect-square rounded border-2 border-black dark:border-white mx-3 cursor-pointer flex items-center",
						finished
							? "bg-slate-blue text-white dark:bg-white dark:text-black"
							: "",
					)}
					onClick={(e) => {
						if (!finished) {
							addCompletedTask(props.id);
						} else {
							removeCompletedTask(props.id);
						}
						setFinished(!finished);
					}}
				>
					{finished && (
						<CheckIcon className="m-auto stroke-1 stroke-white dark:stroke-black" />
					)}
				</div>
			)}
			<div className="w-full flex flex-col gap-2">
				<h1
					className={twMerge(
						"text-lg mb-1",
						props.menuOption === 0 && finished
							? "line-through text-gray-500"
							: "no-underline",
						props.menuOption === 1 && props.liked ? "ml-5" : "",
					)}
				>
					{props.title.split(" ").map((i, ind) => {
						if (i.startsWith("@")) {
							return (
								<p
									key={ind + "@"}
									className={twMerge(
										"rounded inline-block mr-1",
										finished && props.menuOption === 0
											? "line-through font-normal"
											: "font-bold text-slate-blue underline",
									)}
								>
									{i.substring(1)}
								</p>
							);
						}
						return i + " ";
					})}
				</h1>
				<ul className="flex flex-wrap items-center gap-2">
					<Pill key="createdAt" text={createdAt} />
					{props.menuOption === 1 &&
						(props.days.length < 7 ? (
							props.days.map((i, ind) => (
								<Pill key={ind + "b"} text={i} />
							))
						) : (
							<Pill key={"c"} text="all week" />
						))}
				</ul>
			</div>
			<button
				className={twMerge("ml-auto", selected ? "p-1" : "p-2")}
				onClick={(e) => {
					setSelected(!selected);
					setSelectedTasks(props.id);
				}}
			>
				<Circle
					weight="fill"
					size={32}
					className={twMerge(selected ? "w-6 h-6" : "w-3 h-3")}
				/>
			</button>
			{props.liked && (
				<div
					className={twMerge(
						"p-2 rounded-full absolute -top-2 -left-2 bg-white dark:bg-gray-900 border-2",
						selected
							? "border-black dark:border-white"
							: "dark:border-gray-800",
					)}
				>
					<HeartIcon className="fill-slate-blue" />
				</div>
			)}
		</motion.li>
	);
}
