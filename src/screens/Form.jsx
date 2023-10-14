import {
	PlusIcon,
	XCircleIcon,
	CheckIcon,
	XMarkIcon,
	BackspaceIcon,
} from "@heroicons/react/24/outline";
import { taskify } from "../schema/Task.js";
import { useState, useRef, useId } from "react";
import { useStore } from "../util/useStore";
import * as Toggle from "@radix-ui/react-toggle";
import { motion, AnimatePresence } from "framer-motion";

function Toggler(props) {
	return (
		<Toggle.Root
			aria-label={"Toggle " + props.text}
			className="data-[state=on]:border-black data-[state=on]:bg-slate-blue data-[state=on]:text-white flex items-center justify-center rounded-lg leading-4 border-2 p-3 px-4 w-fill dark:border-neutral-800"
			onPressedChange={(value) => props.onSelect(value)}
		>
			{props.text}
		</Toggle.Root>
	);
}

export default function Form(props) {
	const tasks = useStore((state) => state.tasks);
	const tags = useStore((state) => state.tags);
	const daysName = useStore((state) => state.daysName);

	const addTask = useStore((state) => state.addTask);

	const [days, setDays] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);

	const [activeTags, setActiveTags] = useState([]);
	const [tagsForm, setTagsForm] = useState(false);
	const tagFormInp = useRef();

	const inputId = useId();
	const outerDiv = useId();

	function handleSubmit(e) {
		e.preventDefault();

		let title = e.target.title.value;
		if (title.length < 1) {
			return;
		}

		let taskDays = [];
		for (let i = 0; i < 7; i++) {
			if (days[i]) {
				taskDays.push(daysName[i]);
			}
		}

		if (taskDays.length < 1) {
			return;
		}

		let task = taskify({
			tasks: tasks,
			title: title,
			tags: activeTags,
			days: taskDays,
		});

		addTask(task);
		props.setShowAddForm(false);
	}

	return (
		<div
			id={outerDiv}
			className="z-30 w-full h-full fixed inset-0 backdrop-blur-[2px] bg-neutral-900/25 dark:bg-neutral-800/25"
			onClick={(e) => {
				if (e.target.id === outerDiv) {
					props.setShowAddForm(0);
				}
			}}
		>
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0 }}
					className="w-full overflow-y-scroll h-fit bg-white dark:bg-zinc-900 dark:text-white absolute bottom-0 p-8 pt-4 flex flex-col items-center gap-3 rounded-t-2xl"
				>
					<form
						className="w-full flex flex-col gap-6 mt-8"
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}
					>
						<h1 className="text-3xl font-bold leading-9">
							Add a task
						</h1>
						<label
							htmlFor={inputId}
							className="flex flex-col items-center gap-2"
						>
							<p className="w-fit mr-auto">prompt</p>
							<input
								id={inputId}
								type="text"
								name="title"
								className="border-2 border-neutral-300 dark:border-neutral-800 bg-transparent text-lg w-full rounded-lg p-2 px-4"
								placeholder="type here..."
							/>
							<p className="w-fit mr-auto text-neutral-400 dark:text-neutral-700">
								Use @ to highlight words
							</p>
						</label>
						<div className="flex flex-col gap-1">
							<p className="w-fit mr-auto">days</p>
							<div className="grid grid-cols-4 gap-2">
								<Toggler
									text={"all"}
									onSelect={(value) => {
										let delta = days.reduce(
											(prev, curr) => prev && curr,
											true,
										);
										if (delta) {
											setDays(days.map((i) => false));
										} else {
											setDays(days.map((i) => true));
										}
									}}
								/>
								{daysName.map((i) => (
									<Toggler
										key={i}
										text={i}
										onSelect={(value) => {
											let ind = daysName.indexOf(i);
											days[ind] = value;
											setDays(days);
										}}
									/>
								))}
							</div>
						</div>

						<div className="flex items-center justify-between gap-4">
							<button
								onClick={(e) => {
									props.setShowAddForm(0);
								}}
								type="button"
								className="w-full border-2 border-neutral-900 dark:border-neutral-800 text-neutral-900 dark:text-white p-4 mt-4 rounded-lg text-lg font-medium"
							>
								Close
							</button>
							<button
								type="submit"
								className="w-full bg-slate-blue border-2 border-neutral-900 text-white dark:text-black p-4 mt-4 rounded-lg text-lg font-medium"
							>
								Add
							</button>
						</div>
					</form>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
