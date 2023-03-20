import Header from '../components/Header'
import Task from '../components/Task'
import SideBar from '../components/SideBar'
import { PlusSmallIcon, TrashIcon, PencilIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { getItem, setItem, removeItem } from '../util/useStorage'

export default function Home(props){

	const daysName = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
	const today = daysName[new Date().getDay()]
	const [ menuOption, setMenuOption ] = useState(0)
	const [ activeTasks, setActiveTasks ] = useState([])
	const [ toggleSideBar, setToggleSideBar ] = useState(false)

	function filterTasks(tasks){
		let t = tasks.filter(i => i.days.includes(today))
		return t
	}

	useEffect(() => {
		if(props.tasks.length < 1){
			props.setCompletedTasks([])
		}
		setActiveTasks(filterTasks(props.tasks))
	}, [menuOption, props.tasks])	

	useEffect(() => {
		removeItem('completed', props.completedTasks)
	}, [props.completedTasks])

	return (
		<div className="p-4 px-6 pb-6 bg-white">
			{
				toggleSideBar && <SideBar 
					setToggleSideBar={setToggleSideBar}
				/>
			}
			<Header 
				menuOption={menuOption}
				setMenuOption={setMenuOption}
				completedTasks={props.completedTasks}
				tasks={activeTasks}
				setToggleSideBar={setToggleSideBar}
			/>
			<ul>
			{
				activeTasks.length > 0 && activeTasks.map(i => 
					<Task key={i.id} {...i} 
						selectedList={props.selectedList} 
						setSelectedList={props.setSelectedList} 
						completedTasks={props.completedTasks}
						setCompletedTasks={props.setCompletedTasks}
						menuOption={menuOption}
				/>)
			}
			</ul>

			<div className="fixed bottom-0 right-0 m-6 flex items-center gap-2">
			{
				props.selectedList.length > 0 ?
				<button
					className="p-4 bg-red-500 rounded-full text-white"
					onClick={(e) => {
						props.deleteTasks()
					}}
				>
						<TrashIcon className="w-5 h-5" />
				</button>
				:
				<button
					className="p-4 bg-black rounded-full text-white"
					onClick={(e) => {
						props.setShowAddForm(1)
					}}
				>
						<PlusIcon className="w-5 h-5" />
				</button>
			}
			</div>
		</div>
	)
}