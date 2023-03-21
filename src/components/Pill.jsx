export default function Pill(props){
	return (
		<li className="text-black dark:text-white text-xs p-2 px-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium">
			{props.text}
		</li>
	)
}