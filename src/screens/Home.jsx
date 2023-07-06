import Header from "../components/Header";
import Task from "../components/Task";
import Toast from "../components/Toast";
import {
	PlusSmallIcon,
	TrashIcon,
	PencilIcon,
	XMarkIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon, HeartIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "../util/useStorage";
import { useStore } from "../util/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

function TaskList(props) {
	let day = format(new Date(), "ccc").toLowerCase();
	const tasks = useStore((state) =>
		state.tasks.filter((i) => i.days.includes(day))
	);

	return (
		<motion.ul>
			<AnimatePresence>
				{tasks.length < 1 ? (
					<li className="w-full h-24 mt-24 flex">
						<div className="m-auto flex flex-col gap-3 items-left text-xl text-gray-300">
							<SparklesIcon className="w-8 h-8" />
							<p>Add a new task</p>
						</div>
					</li>
				) : (
					tasks.map((task) => {
						return (
							<Task
								key={task.id}
								{...task}
								state={props.state}
								dispatch={props.dispatch}
								menuOption={props.menuOption}
							/>
						);
					})
				)}
			</AnimatePresence>
		</motion.ul>
	);
}

export default function Home(props) {
	const [menuOption, setMenuOption] = useState(0);
	const [showSearch, setShowSearch] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [tasks, setTasks] = useState([]);
	const aTasks = useStore((state) => state.activeTasks);
	const t = useStore((state) => state.tasks);

	function searchTask(text) {
		if (menuOption === 0) {
			let activeTasks = t.filter((task) => aTasks.includes(task.id));
			console.log(activeTasks)
			setTasks(
				activeTasks.filter((i) => {
					return (
						i.title.toLowerCase().indexOf(text.toLowerCase()) > -1
					);
				})
			);
		} else {
			setTasks(
				tasks.filter((i) => {
					return (
						i.title.toLowerCase().indexOf(text.toLowerCase()) > -1
					);
				})
			);
		}
	}

	function setTasksAroundMenu() {
		if (menuOption === 0) {
			setTasks(aTasks);
		} else {
			setTasks(t);
		}
	}

	useEffect(() => {
		setTasksAroundMenu();
	}, [menuOption, showSearch]);

	return (
		<div className="p-4 px-6 pb-6 bg-white dark:bg-gray-900 dark:text-white min-h-screen w-full">
			{/*<Toast message="Hello world" />*/}
			<Header
				state={props.state}
				dispatch={props.dispatch}
				tasks={tasks}
				menuOption={menuOption}
				setMenuOption={setMenuOption}
				setShowTagEditor={props.setShowTagEditor}
				showSearch={showSearch}
				setShowSearch={setShowSearch}
				searchText={searchText}
				setSearchText={setSearchText}
				searchTask={searchTask}
			/>
			<TaskList
				state={props.state}
				dispatch={props.dispatch}
				menuOption={menuOption}
			/>
		</div>
	);
}
