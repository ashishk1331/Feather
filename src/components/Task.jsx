import { CheckIcon } from '@heroicons/react/24/solid'
import { Circle } from "@phosphor-icons/react";
import { useState } from 'react'
import { cn } from '../util/cn'
import { setItem } from '../util/useStorage'

export default function Task(props){

	const [ finished, setFinished ] = useState(props.completedTasks.includes(props.id) && props.menuOption === 0)
	const [ selected, setSelected ] = useState(props.selectedList.includes(props.id))

	function setComplete(id){
		let s = new Set(props.completedTasks)
		s.add(id)
		props.setCompletedTasks([ ...s])
	}

	function setUncomplete(id){
		let s = new Set(props.completedTasks)
		if(s.has(id)){
			s.delete(id)
		}
		props.setCompletedTasks([ ...s])
	}

	return (
		<li className={cn("flex items-center gap-2 w-full justify-between p-3 border-2 rounded-lg my-4", selected ? "border-black" : "")}>
			{
				props.menuOption === 0 &&
				<div 
					className={cn("w-7 min-w-7 min-h-7 h-7 aspect-square rounded border-2 border-black mx-3 cursor-pointer flex items-center", finished ? "bg-[black] text-white" : "")}
					onClick={(e) => {
						let n = !finished;
						setFinished(n)
						if(n){
							setComplete(props.id)
						} else {
							setUncomplete(props.id)
						}
					}}
				>
					{
						finished && <CheckIcon className="m-auto fill-white stroke-1 stroke-white" />
					}
				</div>
			}
			<div className="w-full flex flex-col gap-2">
				<h1 className={cn("text-lg", props.menuOption === 0 && finished ? 'line-through text-gray-500' : 'no-underline')}>
					{props.title}
				</h1>
				<ul className="flex flex-wrap items-center gap-2">
					{
						props.tags.map(i => <li key={i} className="text-black p-1 px-3 bg-gray-100 rounded-lg">
								{i}
							</li>
						)
					}
					{
						props.menuOption === 1 && props.days.length < 7 && props.days.map(i => <li key={i} className="text-black p-1 px-3 bg-gray-100 rounded-lg">
								{i}
							</li>
						)
					}
					{
						props.menuOption === 1 && props.days.length >= 7 && <li key='all' className="text-black p-1 px-3 bg-gray-100 rounded-lg">
								week
							</li>
					}
				</ul>
			</div>
			<button 
				className={cn('ml-auto',selected ? "p-1" : "p-3")}
				onClick={(e) => {
					setSelected(!selected)
					let s = new Set(props.selectedList);
					if(s.has(props.id)){
						s.delete(props.id);
					} else {
						s.add(props.id)
					}
					props.setSelectedList([...s])
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