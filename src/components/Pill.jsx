import { cn } from '../util/cn'

export default function Pill(props){
	return (
		<li className={cn("text-black dark:text-white text-xs p-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium flex items-center gap-2")}>
			{props.text}
			{
				props.children
			}
		</li>
	)
}