import { twMerge } from "tailwind-merge";

export default function Pill(props) {
	return (
		<li
			className={twMerge(
				"text-black dark:text-white text-xs p-1.5 px-2 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium flex items-center gap-2",
			)}
		>
			{props.text}
			{props.children}
		</li>
	);
}
