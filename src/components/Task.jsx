import { Circle } from "@phosphor-icons/react";
import { useState } from 'react'

function cn(...classes){
	return classes.filter(Boolean).join(' ')
}

export default function Task(props){

	const [ finished, setFinished ] = useState(false)
	const [ selected, setSelected ] = useState(props.selectedList.includes(props.id))

	return (
		<li className={cn("flex items-center gap-2 w-full justify-between p-3 border-2 rounded-lg my-4", selected ? "border-black" : "")}>
			<input 
				type="checkbox" 
				name="done" 
				className="w-6 h-6 mr-2" 
				onChange={(e) => {
					setFinished(!finished)
				}}
			/>
			<div className="w-full flex flex-col gap-2">
				<h1 className={cn("text-lg", finished ? 'line-through text-gray-500' : 'no-underline')}>
					{props.title}
				</h1>
				<ul className="flex flex-wrap items-center gap-2">
					{
						props.tags.map(i => <li key={i} className="text-black p-1 px-3 bg-gray-100 rounded-lg">
								{i}
							</li>
						)
					}
				</ul>
			</div>
			<button 
				className={cn('ml-auto',selected ? "p-1" : "p-3")}
				onClick={(e) => {
					setSelected(!selected)
					let s = props.selectedList;
					if(s.includes(props.id)){
						s = s.filter(i => i !== props.id);
					} else {
						s.push(props.id)
					}
					props.setSelectedList(s)
				}}
			>
				<Circle 
					weight="fill"
					size={32} 
					className={cn(selected ? "w-6 h-6" : "w-3 h-3")} 
				/>
			</button>
		</li>
	)
}