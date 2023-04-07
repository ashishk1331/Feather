import Header from '../components/Header'
import Task from '../components/Task'
import Toast from '../components/Toast'
import { PlusSmallIcon, TrashIcon, PencilIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { getItem, setItem, removeItem } from '../util/useStorage'
import { motion, AnimatePresence } from "framer-motion"

function TaskList(props){

	const likedTasks = props.tasks.filter(i => i.liked)
	const normalTasks = props.tasks.filter(i => !i.liked)

	return (
		<motion.ul>
		<AnimatePresence>
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
		</AnimatePresence>
		</motion.ul>
	)
}

export default function Home(props){

	const [ menuOption, setMenuOption ] = useState(0)
	const [ showSearch, setShowSearch ] = useState(true)
	const [ searchText, setSearchText ] = useState('')
	const [ tasks, setTasks ] = useState([])

	function searchTask(text){
		if(menuOption === 0){
			setTasks(props.state.activeTasks.filter(i => { 
				return i.title.toLowerCase().indexOf(text.toLowerCase()) > -1
			}))
		} else {
			setTasks(props.state.tasks.filter(i => { 
				return i.title.toLowerCase().indexOf(text.toLowerCase()) > -1
			}))
		}
	}

	function setTasksAroundMenu(){
		if(menuOption === 0){
			setTasks(props.state.activeTasks)
		} else {
			setTasks(props.state.tasks)
		}		
	}

	useEffect(() => {
		setTasksAroundMenu()
	}, [menuOption, showSearch])

	return (
		<div className="p-4 px-6 pb-6 bg-white dark:bg-gray-900 dark:text-white min-h-screen w-full">
			{/*<Toast message="Hello world" />*/}
			<Header 
				state={props.state}
				dispatch={props.dispatch}
				tasks={tasks}

				menuOption={menuOption}
				setMenuOption={setMenuOption}
				setShowTagEditor={props.setShowTagEditor}
				showSearch={showSearch}
				setShowSearch={setShowSearch}
				searchText={searchText}
				setSearchText={setSearchText}
				searchTask={searchTask}
			/>
			<TaskList tasks={ tasks.length > 0 ? tasks : props.state.activeTasks } state={props.state} dispatch={props.dispatch} menuOption={menuOption} />			
		</div>
	)
}