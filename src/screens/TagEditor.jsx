import {
	XCircleIcon,
	XMarkIcon,
	BackspaceIcon,
	CheckIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "../util/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";

export default function TagEditor(props) {
	const tags = useStore((state) => state.tags);
	const addTag = useStore((state) => state.addTag);
	const removeTag = useStore((state) => state.removeTag);

	const outerDiv = useId();

	return (
		<div
			id={outerDiv}
			className="z-30 w-full h-full fixed inset-0 backdrop-blur-[2px] bg-gray-900/25 dark:bg-gray-600/25"
			onClick={(e) => {
				if(e.target.id === outerDiv){
					props.setShowTagEditor(false)
				}
			}}
		>
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0 }}
					className="w-full h-fit bg-white dark:bg-gray-900 dark:text-white absolute bottom-0 p-8 pt-8 flex flex-col items-center gap-3 rounded-t-2xl"
				>
					<h1 className="text-3xl font-bold leading-9 mr-auto my-2">
						Adjust tags
					</h1>

					<form
						onSubmit={(e) => {
							e.preventDefault();

							let {
								title: { value: taskTitle },
							} = e.target;

							if (taskTitle) {
								taskTitle = taskTitle.toLowerCase();
								addTag(taskTitle);
							}

							e.target.reset();
						}}
						className="flex items-center gap-2 w-full"
					>
						<input
							type="text"
							name="title"
							className="border-2 border-gray-200 dark:border-gray-800 bg-transparent text-lg w-full rounded-lg p-1 px-4"
							placeholder="type here..."
						/>
						<button
							className="p-2 px-4"
							type="submit"
						>
							<CheckIcon className="w-6 h-6" />
						</button>
					</form>

					{tags.length > 0 && (
						<ul className="w-full flex items-center flex-wrap gap-2">
							<li className="w-full">tags</li>
							{tags.map((i, index) => (
								<li
									className="font-mono text-black dark:text-white p-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center gap-3"
									key={index + "tags"}
								>
									{i}
									<XMarkIcon
										onClick={() => {
											removeTag(i);
										}}
									/>
								</li>
							))}
						</ul>
					)}

					<button
						type="submit"
						className="w-full bg-gray-900 border-2 border-gray-900 dark:bg-gray-200 text-white dark:text-black p-4 mt-8 rounded-lg text-lg font-medium"
						onClick={() => {
							props.setShowTagEditor(false);
						}}
					>
						Close
					</button>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
