import Header from '../components/Header'
import Task from '../components/Task'
import { PlusSmallIcon, TrashIcon, PencilIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { getItem, setItem, removeItem } from '../util/useStorage'

function TaskList(props){

	const likedTasks = props.tasks.filter(i => i.liked)
	const normalTasks = props.tasks.filter(i => !i.liked)

	return (
		<ul>
			{
				(props.tasks.length < 1) ?
				<li className="w-full h-24 mt-24 flex">
					<div className="m-auto flex flex-col gap-3 items-left text-xl text-gray-300">
						<SparklesIcon className="w-8 h-8" />
						<p>Add a new task</p>
					</div>
				</li>
				:
				[
				...likedTasks.map(i => {
						return <Task key={i.id} {...i}
							state={props.state}
							dispatch={props.dispatch}
							menuOption={props.menuOption}
						/>
				}),
				...normalTasks.map(i => {
						return <Task key={i.id} {...i}
							state={props.state}
							dispatch={props.dispatch}
							menuOption={props.menuOption}
						/>
				})
				]
			}
		</ul>
	)
}

export default function Home(props){

	const [ menuOption, setMenuOption ] = useState(0)
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

	return (
		<div className="p-4 px-6 pb-6 bg-white dark:bg-gray-900 dark:text-white min-h-screen w-full">
			<Header 
				state={props.state}
				dispatch={props.dispatch}

				menuOption={menuOption}
				setMenuOption={setMenuOption}
				setShowTagEditor={props.setShowTagEditor}
				showSearch={showSearch}
				setShowSearch={setShowSearch}
				searchText={searchText}
				setSearchText={setSearchText}
				searchTask={searchTask}
			/>
			{
				menuOption === 0 ?
				<TaskList tasks={props.state.activeTasks} state={props.state} dispatch={props.dispatch} menuOption={menuOption} />
				:
				<TaskList tasks={props.state.tasks} state={props.state} dispatch={props.dispatch} menuOption={menuOption} />
			}
		</div>
	)
}