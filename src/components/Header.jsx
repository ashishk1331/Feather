import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Header(props){
	return (
		<div className="flex items-center justify-between w-full my-4">
			<div className="flex flex-col items-center gap-1">
				<h1 className="text-3xl font-bold leading-9">Tasks
				</h1>
				<p className="text-gray-500">{new Date().toLocaleDateString()}</p>
			</div>
			<button className="relative flex items-center gap-1 p-2 px-4 bg-gray-100 rounded-lg">
				view all
				<ChevronDownIcon />
			</button>
			<div>
				drop down
			</div>
		</div>
	)
}