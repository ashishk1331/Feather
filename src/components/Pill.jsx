export default function Pill(props){
	return (
		<li className="text-black text-xs p-2 px-3 bg-gray-100 rounded-xl font-medium">
			{props.text}
		</li>
	)
}