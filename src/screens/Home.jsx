import Header from '../components/Header'
import Task from '../components/Task'
import { PlusSmallIcon, TrashIcon, PencilIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { getItem, setItem, removeItem } from '../util/useStorage'

export default function Home(props){

	const daysName = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
	const today = daysName[new Date().getDay()]
	const [ menuOption, setMenuOption ] = useState(0)
	const [ activeTasks, setActiveTasks ] = useState([])
	const [ showSearch, setShowSearch ] = useState(true)
	const [ searchText, setSearchText ] = useState('')

	function filterTasks(tasks){
		let t = tasks.filter(i => i.days.includes(today))
		return t
	}

	function searchTask(text){
		setActiveTasks(props.tasks.filter(i => { 
			return i.title.toLowerCase().indexOf(text.toLowerCase()) > -1
		}))
	}

	useEffect(() => {
		if(props.tasks.length < 1){
			props.setCompletedTasks([])
		}

		if(!showSearch){ 
			return
		}

		if(props.menuOption === 0){
			setActiveTasks(filterTasks(props.tasks))
		} else {
			setActiveTasks(props.tasks)
		}
	}, [menuOption, props.tasks, showSearch])	

	useEffect(() => {
		removeItem('completed', props.completedTasks)
	}, [props.completedTasks])

	return (
		<div className="p-4 px-6 pb-6 bg-white dark:bg-gray-900 dark:text-white min-h-screen w-full">
			<Header 
				menuOption={menuOption}
				setMenuOption={setMenuOption}
				completedTasks={props.completedTasks}
				tasks={activeTasks}
				alreadyCompleted={ activeTasks.length === getItem('completed').length }
				setShowTagEditor={props.setShowTagEditor}
				showSearch={showSearch}
				setShowSearch={setShowSearch}
				searchText={searchText}
				setSearchText={setSearchText}
				searchTask={searchTask}
			/>
			<ul>
			{
				(activeTasks.length < 1) ?
				<li className="w-full h-24 mt-24 flex">
					<div className="m-auto flex flex-col gap-3 items-left text-xl text-gray-300">
						<SparklesIcon className="w-8 h-8" />
						<p>Add a new task</p>
					</div>
				</li>
				:
				[...activeTasks.map(i => {
					if(i.liked)
						return <Task key={i.id} {...i} 
							selectedList={props.selectedList} 
							setSelectedList={props.setSelectedList} 
							completedTasks={props.completedTasks}
							setCompletedTasks={props.setCompletedTasks}
							menuOption={menuOption}
						/>
				})
				,
				...activeTasks.map(i => {
					if(!i.liked)
						return <Task key={i.id} {...i} 
							selectedList={props.selectedList} 
							setSelectedList={props.setSelectedList} 
							completedTasks={props.completedTasks}
							setCompletedTasks={props.setCompletedTasks}
							menuOption={menuOption}
						/>
				})]
			}
			</ul>

			<div className="fixed bottom-0 right-0 m-6 flex items-center gap-2">
			{
				props.selectedList.length > 0 ?
				<>
					<button
						className="p-4 bg-red-500 rounded-full text-white"
						onClick={(e) => {
							props.deleteTasks()
						}}
					>
							<TrashIcon className="w-5 h-5" />
					</button>
					<button
						className="p-4 bg-black dark:bg-neutral-100 rounded-full text-white dark:text-black"
						onClick={(e) => {
							props.likeTasks()
						}}
					>
							<HeartIcon className="w-5 h-5" />
					</button>
					<button
						className="p-4 bg-black dark:bg-neutral-100 rounded-full text-white dark:text-black"
						onClick={(e) => {
							props.deSelect()
						}}
					>
							<XMarkIcon className="w-5 h-5" />
					</button>
				</>
				:
				<button
					className="p-4 bg-black rounded-full dark:bg-neutral-100 text-white dark:text-black"
					onClick={(e) => {
						props.setShowAddForm(true)
					}}
				>
						<PlusIcon className="w-5 h-5" />
				</button>
			}
			</div>
		</div>
	)
}