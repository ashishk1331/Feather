import { PlusIcon, XCircleIcon, CheckIcon, XMarkIcon, BackspaceIcon } from '@heroicons/react/24/outline'
import { taskify } from '../schema/Task.js'
import { useState, useRef } from 'react'
import { getItem, setItem, removeItem } from '../util/useStorage'
import { cn } from '../util/cn'

function Toggler(props){

	const [ selected, setSelected ] = useState(props.selected)

	return (
		<a 
			href="#" 
			className={cn("text-gray-300 border-2 dark:border-gray-800 p-2 px-4 rounded-lg", selected ? 'bg-black dark:bg-gray-500 border-black text-white dark:text-black' : '')}
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
	const [ tags, setTags ] = useState(getItem('tags'))
	const [ activeTags, setActiveTags ] = useState([])
	const daysName = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
	const [ tagsForm, setTagsForm ] = useState(false)
	const tagFormInp = useRef();

	function handleSubmit(e){
		e.preventDefault();

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

		if(taskDays.length < 1 || activeTags.length < 1){ return }

		let task = taskify({
			tasks: props.tasks,
			title: title,
			tags: activeTags,
			days: taskDays
		})

		props.setTasks([task, ...props.tasks])

		props.setShowAddForm(0);

		setItem('tasks', [task])
	}


	return (
		<div className="w-full h-full absolute inset-0 backdrop-blur-[2px] bg-gray-900/25">
			<div className="w-full h-fit bg-white dark:bg-gray-900 dark:text-white absolute bottom-0 p-8 pt-4 flex flex-col items-center gap-3 rounded-t-2xl">
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
							className="border-2 border-gray-300 dark:border-gray-800 bg-transparent text-lg w-full rounded-lg p-2 px-4" 
							placeholder="type here..."
						/>
					</label>
					<div className="flex flex-col gap-1">
						<p className="w-fit mr-auto">days</p>
						<div className="flex flex-wrap items-start gap-2">
							<Toggler 
								key={'all'} 
								text={'all'} 
								selected={days.reduce((prev, curr) => prev && curr, true)}
								click={() => {
									let delta = days.reduce((prev, curr) => prev && curr, true)
									if(delta){
										setDays(days.map(i => false))
									} else {
										setDays(days.map(i => true))
									}
								}}
							/>
							{
								daysName.map(i => <Toggler 
									key={i} 
									text={i} 
									selected={days[daysName.indexOf(i)]}
									click={() => {
										let ind = daysName.indexOf(i);
										days[ind] = !days[ind]
										setDays(days)
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
									}} 
								/>)
							}
							<a 
								href="#" 
								className={cn("border-2  p-3 rounded-full", tagsForm ? "border-black text-black dark:text-white dark:border-white" : " text-gray-300 dark:text-gray-500 dark:border-gray-800")}
								onClick={() => {
									setTagsForm(!tagsForm)
								}}
							>
								{
									tagsForm ?
									<XMarkIcon />
									:
									<PlusIcon />
								}
							</a>
							{
								tagsForm && <div className="w-full flex items-center gap-1 mt-3 dark:text-gray-600">
									<a 
										className="p-3" 
										href="#"
										onClick={(e) => {
											e.preventDefault();
											tagFormInp.current.value = '';
										}}
									>
										<BackspaceIcon className="w-6 h-6 rotate-180" />
									</a>
									<input 
										type="text" 
										name="title"
										className="border-2 border-gray-200 dark:border-gray-800 bg-transparent text-lg w-full rounded-lg p-1 px-4" 
										placeholder="type here..."
										ref={tagFormInp}
									/>
									<a 
										className="p-3" 
										href="#"
										onClick={(e) => {
											e.preventDefault();
											let tag = tagFormInp.current.value.toLowerCase()
											// setActiveTags([tag, ...activeTags])
											setItem('tags', [tag])
											setTags([tag, ...tags])
											tagFormInp.current.value = ''
										}}
									>
										<CheckIcon className="w-6 h-6" />
									</a>
								</div>
							}
						</div>
					</div>
					<button 
						type="submit" 
						className="w-full bg-gray-900 dark:bg-gray-200 text-white dark:text-black p-4 mt-4 rounded-lg text-lg font-medium"
					>
						Add
					</button>
				</form>
			</div>
		</div>
	)
}