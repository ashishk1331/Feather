import { PlusIcon, XCircleIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { taskify } from '../schema/Task.js'
import { useState } from 'react'
import { getItem, setItem, removeItem } from '../util/useStorage'

function cn(...classes){
	return classes.filter(Boolean).join(' ')
}

function Toggler(props){

	const [ selected, setSelected ] = useState(false)

	return (
		<a 
			href="#" 
			className={cn("text-gray-300 border-2 p-2 px-4 rounded-lg", selected ? 'bg-black border-black text-white' : '')}
			onClick={() => {
				setSelected(!selected)
				props.click()
			}}
		>
			{props.text}
		</a>
	)
}

export default function Form(props){

	const [ days, setDays ] = useState([false, false, false, false, false, false, false])
	const [ tags, setTags ] = useState(['work', 'personel', 'office'])
	const [ activeTags, setActiveTags ] = useState([])
	const daysName = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

	function handleSubmit(e){
		let title = e.target.title.value
		if(title.length < 1){
			return;
		}

		let taskDays = []
		for(let i = 0; i < 7; i++){
			if(days[i]){
				taskDays.push(daysName[i])
			}
		}

		let task = taskify({
			tasks: props.tasks,
			title: title,
			tags: activeTags,
			days: taskDays
		})

		props.setTasks([task, ...props.tasks ])

		props.setShowAddForm(0);

		setItem('tasks', task)

		console.log(task)
	}


	return (
		<div className="w-full h-full absolute inset-0 backdrop-blur-[2px] bg-gray-900/25">
			<div className="w-full h-fit bg-[white] absolute bottom-0 p-8 pt-4 flex flex-col items-center gap-3 rounded-t-2xl">
				<button
					className="p-3"
					onClick={(e) => {
						props.setShowAddForm(0);
					}}
				>
					<XCircleIcon className="w-8 h-8" />
				</button>
				<form 
					className="w-full flex flex-col gap-6"
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(e);
					}}
				>
					<h1 className="text-3xl font-bold leading-9">Add a task</h1>
					<label htmlFor="" className="flex flex-col items-center gap-2">
						<p className="w-fit mr-auto">prompt</p>
						<input 
							type="text" 
							name="title"
							className="border-2 border-gray-300 text-lg w-full rounded-lg p-2 px-4" 
							placeholder="type here..."
						/>
					</label>
					<div className="flex flex-col gap-1">
						<p className="w-fit mr-auto">days</p>
						<div className="flex flex-wrap items-start gap-2">
							{
								daysName.map(i => <Toggler 
									key={i} 
									text={i} 
									click={() => {
										let ind = daysName.indexOf(i);
										days[ind] = !days[ind]
										setDays(days)
										console.log(days)
									}}
								/>)
							}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<p className="w-fit mr-auto">tags</p>
						<div className="flex flex-wrap items-start gap-2">
							{
								tags.map(i => <Toggler 
									key={i} 
									text={i} 
									click={() => {
										if(activeTags.includes(i)){
											setActiveTags(activeTags.filter(text => text !== i))
										} else {
											setActiveTags([i, ...activeTags ])
										}

										console.log(activeTags)
									}} 
								/>)
							}
							<a href="#" className="text-black border-2 border-black p-3 rounded-full">
								<PlusIcon />
							</a>
							{/*<div className="w-full flex items-center gap-1 mt-3">
								<button className="p-3">
									<XMarkIcon className="w-6 h-6" />
								</button>
								<input 
									type="text" 
									name="title"
									className="border-2 border-gray-200 text-lg w-full rounded-lg p-1 px-4" 
									placeholder="type here..."
								/>
								<button className="p-3">
									<CheckIcon className="w-6 h-6" />
								</button>
							</div>*/}
						</div>
					</div>
					<button className="w-full bg-[#111827] text-white p-4 rounded-lg text-lg font-medium">
						Add
					</button>
				</form>
			</div>
		</div>
	)
}